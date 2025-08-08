<template>
	<div class="container">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
	position: relative;
	display: flex;
	width: 100%;
	min-height: 100vh;
}
</style>
