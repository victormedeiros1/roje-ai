<template>
	<div class="chat-container" @click="fecharChat">
		<div class="chat" @click.stop ref="chat">
			<div class="header">
				<div class="header__acoes-prontas" ref="acoesProntas">
					<Button
						class="header__acao-pronta"
						text
						v-for="acao in acoesProntasTexto"
						:key="acao"
						:label="acao"
						@click="enviarMensagemPronta(acao)"
					/>
				</div>
			</div>
			<div class="content">
				<h1
					class="content__title"
					:class="`content__title--${diminuirTamanhoDosTitulos ? 'menor' : ''}`"
					ref="tituloDoChat"
				>
					Olá, eu sou o Roje!
				</h1>
				<h3
					class="content__subtitulo"
					:class="`content__subtitulo--${diminuirTamanhoDosTitulos ? 'menor' : ''}`"
					ref="subtituloDoChat"
				>
					O seu assistente de banco de horas
				</h3>
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
						<div class="mensagem__texto" :class="`mensagem__texto--${mensagem.tipo}`">
							{{ mensagem.texto }}
						</div>
					</div>
				</div>
			</div>
			<div class="footer" ref="footer">
				<form class="footer__form" @submit.prevent="enviarMensagem">
					<InputText class="footer__campo" ref="campoDeTexto" v-model="mensagemAtual" />
					<Button
						class="footer__enviar"
						text
						icon="pi pi-send"
						:disabled="mensagemVazia"
					/>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useAnimations } from '@/animations/animations'
import { api } from '@/services/api/http'
import { onMounted, ref, defineEmits, nextTick, computed } from 'vue'

interface Mensagem {
	tipo: 'human' | 'roje'
	texto: string
}

const { fadeIn } = useAnimations()

const emit = defineEmits<{ fechar: [] }>()

const tituloDoChat = ref<HTMLElement | null>(null)
const subtituloDoChat = ref<HTMLElement | null>(null)
const campoDeTexto = ref<HTMLElement | null>(null)
const acoesProntas = ref<HTMLElement | null>(null)
const chat = ref<HTMLElement | null>(null)
const footer = ref<HTMLElement | null>(null)
const enviar = ref<HTMLElement | null>(null)

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

const scrollarParaOFinal = async () => {
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

const enviarMensagem = () => {
	const mensagemHumana: Mensagem = {
		tipo: 'human',
		texto: mensagemAtual.value
	}

	if (mensagemAtual.value.trim() === '') return

	mensagens.value.push(mensagemHumana)
	mensagemAtual.value = ''

	gerarMensagemRoje()
	scrollarParaOFinal()
}

const enviarMensagemPronta = async (acao: string) => {
	const mensagemHumana: Mensagem = {
		tipo: 'human',
		texto: acao
	}

	mensagens.value.push(mensagemHumana)

	await gerarMensagemRoje()
}

const buscarValorDoBancoDeHoras = async () => {
	const mensagemPensando: Mensagem = {
		tipo: 'roje',
		texto: 'Estou consultando o banco de horas... 🤔'
	}

	mensagens.value.push(mensagemPensando)
	await new Promise(resolve => setTimeout(resolve, 3000))
	mensagens.value.pop()

	const mensagemRoje: Mensagem = {
		tipo: 'roje',
		texto: 'Você tem um saldo de 10 horas no seu banco de horas'
	}

	mensagens.value.push(mensagemRoje)
	diminuirTamanhoDosTitulos()
}

const gerarMensagemRoje = async () => {
	const mensagemPensando: Mensagem = {
		tipo: 'roje',
		texto: 'Pensando... 🤔'
	}

	mensagens.value.push(mensagemPensando)
	await new Promise(resolve => setTimeout(resolve, 1000))
	mensagens.value.pop()

	const mensagemRoje: Mensagem = {
		tipo: 'roje',
		texto: 'Olá, eu sou o Roje!'
	}

	mensagens.value.push(mensagemRoje)
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

	setTimeout(() => {
		buscarValorDoBancoDeHoras()
	}, 2000)
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
	}

	.content {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--p-32) var(--p-16) 0 var(--p-16);

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

			&--roje {
				align-self: flex-end;
			}

			&__usuario {
				font-size: var(--fs-12);
				font-weight: 600;

				&--roje {
					align-self: flex-end;
				}
			}

			&__texto {
				display: flex;
				flex-direction: column;
				width: fit-content;
				font-size: var(--fs-14);
				border-radius: 6px;
				gap: var(--g-4);
				padding: var(--p-16);

				&--human {
					background-color: var(--gray-100);
					box-shadow: var(--shadow-baloon);
				}

				&--roje {
					padding-top: 0;
					padding-right: 0;
				}
			}
		}
	}

	.footer {
		width: 100%;

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
