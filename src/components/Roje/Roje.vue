<template>
	<div class="roje">
		<img class="roje__icone" src="@/assets/images/safe.svg" />
	</div>
</template>

<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
</script>

<style scoped lang="scss">
.roje {
	cursor: pointer;
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

	&:hover {
		animation: floatEffect 1s infinite alternate;
	}

	@keyframes floatEffect {
		100% {
			transform: translateY(-10px);
		}
	}
}
</style>
