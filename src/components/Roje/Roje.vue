<template>
	<Chat v-if="rojeAberto" @fechar="fecharRoje" :primeiraMensagem="primeiraMensagem" />
	<Tooltip
		v-if="!rojeAberto && tooltipVisivel && !buscandoPrimeiraMensagem"
		:message="message"
		@fechar="fecharTooltip"
	/>
	<div class="roje" :class="`roje--${buscandoPrimeiraMensagem ? 'desabilitado': ''}`" @click="abrirRoje" ref="roje">
		<img class="roje__icone" src="@/assets/images/safe.svg" />
	</div>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat/Chat.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import { useAnimations } from '@/animations/animations'
import { api } from '@/services/api/http'
import { ref, onMounted, onBeforeMount } from 'vue'

const { fadeIn } = useAnimations()

const rojeAberto = ref<Boolean>(false)
const tooltipVisivel = ref<Boolean>(true)
const buscandoPrimeiraMensagem = ref<Boolean>(true)
const message = ref<String>('')
const primeiraMensagem = ref<String>('')

const roje = ref<HTMLElement | null>(null)

const abrirRoje = (): void => {
	rojeAberto.value = !rojeAberto.value
}

const fecharRoje = (): void => {
	rojeAberto.value = false
}

const fecharTooltip = (): void => {
	tooltipVisivel.value = false
}

const sortearUmaMensagem = () => {
	const messages = [
		'Eu sei que você está devendo horas, quer saber um jeito fácil de resolver isso?',
		'Parece que você trabalhou mais que o esperado. Parabéns pela dedicação, que tal usar seu banco de horas para sair um pouco mais cedo?',
		'Você tem 49 horas no seu banco de horas, que tal tirar um dayoff para descansar? Tenho uma data bem interessante para você.'
	]

	message.value = messages[Math.floor(Math.random() * messages.length)]
}

const buscarInformacoesDoBancoDeHoras = async () => {
	const idMockado = '6897c71e89a236dda372b51c'
	const response = await api.get(`/banco-de-horas/${idMockado}`)
	
	buscandoPrimeiraMensagem.value = false
	primeiraMensagem.value = response.resultado
}

onBeforeMount(() => {
	sortearUmaMensagem()
})

onMounted(async () => {
	await buscarInformacoesDoBancoDeHoras()
})
</script>

<style scoped lang="scss">
.roje {
	cursor: pointer;
	opacity: 1;
	background-color: var(--primary-main);
	position: absolute;
	right: 16px;
	bottom: 16px;
	width: 96px;
	height: 96px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 1000px;
	border: 3px solid var(--gray-300);
	box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.2);
	z-index: var(--roje);
}
.roje--desabilitado {
	cursor: inherit;
	opacity: 0.5;
}
</style>
