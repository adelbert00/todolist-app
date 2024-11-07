<template>
	<div class="settings-container p-4">
		<h2 class="mb-4 text-2xl font-bold">Ustawienia</h2>

		<div class="mb-4">
			<label class="mb-2 block font-semibold">Motyw Kolorystyczny:</label>
			<select
				v-model="theme"
				class="rounded border p-2"
			>
				<option value="light">Jasny</option>
				<option value="dark">Ciemny</option>
			</select>
		</div>

		<button
			@click="saveSettings"
			class="rounded bg-blue-500 px-4 py-2 text-white"
		>
			Zapisz
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const theme = ref('light');

function saveSettings() {
	console.log(`Wybrano motyw: ${theme.value}`);
}
</script>
