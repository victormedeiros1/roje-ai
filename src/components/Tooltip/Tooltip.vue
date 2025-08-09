<template>
	<div class="tooltip">
		<span class="tooltip__message">{{ message }}</span>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ message: string }>()
</script>

<style scoped lang="scss">
.tooltip {
	position: absolute;
	width: 300px;
	bottom: 120px;
	right: 12px;
	background-color: var(--primary-main);
	padding: 8px 12px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	border: 3px solid var(--gray-300);

	&__message {
		color: var(--light);
		font-size: var(--fs-12);
	}

	&__close {
		position: absolute;
		top: 2px;
		right: 4px;
		background: none;
		border: none;
		color: var(--light);
		font-size: 14px;
		cursor: pointer;
		line-height: 1;
		padding: 0;
		transition: transform 0.2s ease;

		&:hover {
			transform: scale(1.5);
		}
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -8px;
		right: 32px;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid var(--primary-main);
	}

	&::before {
		content: '';
		position: absolute;
		bottom: -11px;
		right: 32px;
		width: 0;
		height: 0;
		border-left: 9px solid transparent;
		border-right: 9px solid transparent;
		border-top: 9px solid var(--gray-300);
	}
}
</style>
