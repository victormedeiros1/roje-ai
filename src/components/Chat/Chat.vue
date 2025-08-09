<template>
	<div class="chat-container" @click="fecharChat">
		<div class="chat" @click.stop>
			<div class="chat__acoes-prontas" ref="acoesProntas">
				<Button
					class="chat__acao-pronta"
					text
					v-for="acao in acoesProntasTexto"
					:key="acao"
					:label="acao"
				/>
			</div>
			<h1 class="chat__title" ref="tituloDoChat">Olá, eu sou o Roje!</h1>
			<textarea class="chat__campo" ref="campoDeTexto" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
import Button from 'primevue/button'
import { useAnimations } from '@/animations/animations'
import { onMounted, ref, defineEmits } from 'vue'

const { fadeIn } = useAnimations()

const emit = defineEmits<{ fechar: [] }>()

const tituloDoChat = ref<HTMLElement | null>(null)
const campoDeTexto = ref<HTMLElement | null>(null)
const acoesProntas = ref<HTMLElement | null>(null)

const fecharChat = () => {
	emit('fechar')
}

const acoesProntasTexto = [
	'Me dê dicas do que fazer com meu banco de horas',
	'Quero tirar um day off esse mês',
	'Posso sair mais cedo hoje?'
]

onMounted(() => {
	fadeIn(acoesProntas, { delay: 0.2 })
	fadeIn(tituloDoChat, { delay: 0.4 })
	fadeIn(campoDeTexto, { delay: 0.6 })
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
	height: 80%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16px;
	box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.2);
	border: 4px solid var(--gray-200);
	backdrop-filter: blur(12px);
	padding: var(--p-16);

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

	&__campo {
		width: 100%;
		border: 1px solid var(--gray-300);
		border-radius: 6px;
		resize: none;
		padding: var(--p-16);
	}
}
</style>
