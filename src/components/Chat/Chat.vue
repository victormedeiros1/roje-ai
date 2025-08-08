<template>
	<div class="chat-container">
		<div class="chat">
			<h1 class="chat__title">Olá</h1>
		</div>
	</div>
</template>

<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
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
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16px;
	box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.2);
	border: 4px solid var(--gray-200);
	backdrop-filter: blur(12px);
	padding: var(--p-16);
}
</style>
