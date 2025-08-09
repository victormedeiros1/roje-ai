<template>
	<div class="chat-container" @click="fecharChat">
		<div class="chat" @click.stop>
			<div class="ghost"></div>
			<h1 class="chat__title" ref="tituloDoChat">Olá</h1>
			<textarea class="chat__campo" ref="campoDeTexto" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
import { useAnimations } from '@/animations/animations'
import { onMounted, ref, defineEmits } from 'vue'

const { fadeIn } = useAnimations()

const emit = defineEmits<{ fechar: [] }>()

const tituloDoChat = ref<HTMLElement | null>(null)
const campoDeTexto = ref<HTMLElement | null>(null)

const fecharChat = () => {
	emit('fechar')
}

onMounted(() => {
	fadeIn(tituloDoChat)
	fadeIn(campoDeTexto)
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

	&__campo {
		width: 100%;
		border: 1px solid var(--gray-300);
		border-radius: 6px;
		resize: none;
		padding: var(--p-16);
	}
}
</style>
