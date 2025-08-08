<template>
	<div class="roje">
		<img src="@/assets/images/safe.svg" />
	</div>
</template>

<script setup lang="ts">
import Container from '@/components/Container/Container.vue'
</script>

<style scoped lang="scss">
.roje {
	cursor: pointer;
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
}
</style>
