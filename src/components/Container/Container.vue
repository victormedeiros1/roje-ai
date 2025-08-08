<template>
	<div class="container">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
	background-image: url('@/assets/images/background.png');
	background-size: cover;

	position: relative;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
}
</style>
