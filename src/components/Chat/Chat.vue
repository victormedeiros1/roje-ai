<template>
	<div class="chat-container" @click="fecharChat">
		<div class="chat" @click.stop ref="chat">
			<div class="header">
				<h1
					class="header__title"
					:class="`header__title--${diminuirTamanhoDosTitulos ? 'menor' : ''}`"
					ref="tituloDoChat"
				>
					Olá, eu sou o Roje!
				</h1>
				<h3
					class="header__subtitulo"
					:class="`header__subtitulo--${diminuirTamanhoDosTitulos ? 'menor' : ''}`"
					ref="subtituloDoChat"
				>
					O seu assistente de banco de horas
				</h3>
			</div>
			<div class="content">
				<div class="content__mensagens">
					<div
						class="mensagem"
						:class="`mensagem--${mensagem.tipo}`"
						v-for="mensagem in mensagens"
						:key="mensagem.texto"
					>
						<span
							class="mensagem__usuario"
							:class="`mensagem__usuario--${mensagem.tipo}`"
						>
							{{ mensagem.tipo === 'human' ? 'Eu' : 'Roje' }}
						</span>
						<div class="mensagem__texto" :class="`mensagem__texto--${mensagem.tipo}`" v-html="mensagem.texto">
						</div>
					</div>
				</div>
			</div>
			<div class="footer" ref="footer">
				<div class="footer__acoes-prontas" ref="acoesProntas">
					<Button
						class="footer__acao-pronta"
						text
						v-for="acao in acoesProntasTexto"
						:key="acao"
						:label="acao"
						@click="enviarMensagemParaRoje(acao)"
					/>
				</div>
				<form class="footer__form" @submit.prevent="enviarMensagemParaRoje()">
					<InputText class="footer__campo" ref="campoDeTexto" v-model="mensagemAtual" />
					<Button
						class="footer__enviar"
						text
						icon="pi pi-send"
						:disabled="mensagemVazia"
						@click="enviarMensagemParaRoje()"
					/>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useAnimations } from '@/animations/animations'
import { api } from '@/services/api/http'
import { onMounted, ref, defineEmits, nextTick, computed, defineProps, watch } from 'vue'

interface Mensagem {
	tipo: 'human' | 'roje'
	texto: string
}

const props = defineProps<{ primeiraMensagem: string }>()

const { fadeIn } = useAnimations()

const emit = defineEmits<{ fechar: [] }>()

const tituloDoChat = ref<HTMLElement | null>(null)
const subtituloDoChat = ref<HTMLElement | null>(null)
const campoDeTexto = ref<HTMLElement | null>(null)
const acoesProntas = ref<HTMLElement | null>(null)
const chat = ref<HTMLElement | null>(null)
const footer = ref<HTMLElement | null>(null)

const mensagemAtual = ref<string>('')
const mensagens = ref<Mensagem[]>([])

const acoesProntasTexto = [
	'Me dê dicas do que fazer com meu banco de horas',
	'Quero tirar um day off esse mês',
	'Posso sair mais cedo hoje?',
	'Quantas horas extras preciso fazer para compensar meu banco atualmente?'
]

const mensagemVazia = computed(() => {
	return mensagemAtual.value.trim() === ''
})

const diminuirTamanhoDosTitulos = computed(() => {
	return mensagens.value.length >= 3
})

const rolarParaFim = async () => {
	await nextTick()
	setTimeout(() => {
		const mensagens = document.querySelector('.content__mensagens') as HTMLElement
		if (mensagens) {
			mensagens.scrollTo({
				top: mensagens.scrollHeight,
				behavior: 'smooth'
			})
		}
	}, 50)
}

const enviarMensagemParaRoje = async (acao?: string) => {
	const mensagem: Mensagem = {
		tipo: "human",
		texto: acao ?? mensagemAtual.value
	}

	mensagens.value.push(mensagem)

	const parametros = {
		id_de_empregado: '6897c71e89a236dda372b51c',
		historico_mensagens: mensagens.value,
		mensagem_atual: acao ?? mensagemAtual.value
	}

	mensagens.value.push({
		tipo: "roje",
		texto: "Pensando..."
	})
	
	const response = await api.post('/agente-analista-de-banco-de-horas/sincrono', {
		...parametros
	})

	mensagens.value.pop()
	
	mensagens.value.push({
		tipo: "roje",
		texto: response.resposta[response.resposta.length - 1]
	})

	await rolarParaFim()
}

const fecharChat = () => {
	emit('fechar')
}

onMounted(async () => {
	fadeIn(chat, { delay: 0.2 })
	fadeIn(acoesProntas, { delay: 0.4 })
	fadeIn(tituloDoChat, { delay: 0.6 })
	fadeIn(subtituloDoChat, { delay: 0.8 })
	fadeIn(footer, { delay: 1 })

	mensagens.value.push({
		tipo: "roje",
		texto: props.primeiraMensagem
	})
})
</script>

<style scoped lang="scss">
.chat-container {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.2);
	width: 100%;
	height: 100%;
	z-index: var(--chat);
}
.chat {
	position: absolute;
	width: 60%;
	height: 90%;
	display: flex;
	align-items: center;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16px;
	box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.2);
	border: 4px solid var(--gray-200);
	backdrop-filter: blur(12px);
	padding: var(--p-16);

	.header {
		margin-top: var(--m-32);

		&__title {
			margin: 0;
			&--menor {
				font-size: var(--fs-24);
				transition: 0.5s;
			}
		}

		&__subtitulo {
			margin-top: 0;
			&--menor {
				font-size: var(--fs-14);
				transition: 0.5s;
			}
		}
	}

	.content {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: var(--m-16);

		&__mensagens {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: var(--g-8);
			padding: var(--p-32) var(--p-16);
			overflow-y: auto;
		}

		.mensagem {
			display: flex;
			flex-direction: column;
			animation: fadeIn 0.5s ease-in-out;
			gap: var(--g-4);

			@keyframes fadeIn {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			&--human {
				align-self: flex-end;
			} 

			&__usuario {
				font-size: var(--fs-12);
				font-weight: 600;
				
				&--human {
					align-self: flex-end;
				}
			}

			&__texto {
				background-color: var(--gray-300);
				display: flex;
				flex-direction: column;
				width: fit-content;
				font-size: var(--fs-14);
				border-radius: 6px;
				gap: var(--g-4);

				&--human {
					background-color: var(--gray-100);
					box-shadow: var(--shadow-baloon);
					padding: var(--p-16);
				}

				&--roje {
					padding: var(--p-16);
				}
			}
		}
	}

	.footer {
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: var(--g-16);

		&__acoes-prontas {
			display: flex;
			flex-wrap: wrap;
			gap: var(--p-8);
		}

		&__acao-pronta {
			font-size: var(--fs-14);
			border-radius: 6px;
			border: 1px solid var(--gray-300);
			padding: var(--p-8);
		}

		&__form {
			display: flex;
			align-items: center;
			gap: var(--p-8);
		}

		&__enviar {
			height: 100%;
			font-size: var(--fs-14);
			border-radius: 6px;
			border: 1px solid var(--gray-300);
		}

		&__campo {
			width: 100%;
			border: 1px solid var(--gray-300);
			border-radius: 6px;
			resize: none;
			padding: var(--p-16);
		}
	}
}
</style>
