<template>
	<div class="fixed left-0 top-0 h-full w-52 bg-gray-800 p-4 text-white">
		<div class="mb-4 flex items-center space-x-2">
			<!-- <img
				src=""
				alt=""
				class="h-10 w-10 rounded-full"
			/> -->
			<div>
				<p class="font-bold">Twoje Imię</p>
				<router-link
					to="/profile"
					class="text-sm text-blue-200"
					>Edytuj Profil</router-link
				>
			</div>
		</div>
		<nav class="space-y-4">
			<router-link
				to="/tasks"
				class="block text-lg"
				>Tasks</router-link
			>
			<router-link
				to="/calendar"
				class="block text-lg"
				>Calendar</router-link
			>
			<router-link
				to="/categories"
				class="block text-lg"
				>Categories</router-link
			>
			<router-link
				to="/timer"
				class="block text-lg"
				>Timer</router-link
			>
			<router-link
				to="/settings"
				class="block text-lg"
				>Ustawienia</router-link
			>
		</nav>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Sidebar',
};
</script>
