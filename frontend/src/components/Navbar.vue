<template>
	<nav class="bg-blue-500 p-4 text-white">
		<router-link
			to="/"
			class="mr-4"
			>Home</router-link
		>
		<router-link
			to="/tasks"
			class="mr-4"
			>Tasks</router-link
		>
		<router-link
			to="/calendar"
			class="mr-4"
			>Calendar</router-link
		>
		<router-link to="/categories">Categories</router-link>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Navbar',
});
</script>
