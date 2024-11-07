<template>
	<nav class="flex items-center justify-between bg-blue-500 p-4 text-white">
		<div class="text-lg font-bold">MyToDoApp</div>
		<div>
			<router-link
				to="/account"
				class="mr-4"
				>Account</router-link
			>
			<router-link
				to="/settings"
				class="mr-4"
				>Settings</router-link
			>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Navbar',
});
</script>
