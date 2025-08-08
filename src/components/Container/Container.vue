<template>
	<div class="container">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
	position: relative;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
}
</style>
