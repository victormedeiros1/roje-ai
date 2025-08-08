<template>
	<div class="tooltip">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tooltip {
	position: absolute;
	background-color: var(--gray-800);
	color: var(--white);
	padding: 8px 12px;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	white-space: nowrap;
}
</style>
