<template>
	<div
		v-if="taskStore.isTimerRunning"
		class="fixed bottom-4 right-4 flex items-center space-x-3 rounded bg-gray-800 p-4 text-white shadow-lg"
	>
		<div>
			<p class="font-mono text-2xl">{{ formattedTime }}</p>
		</div>
		<button
			@click="stopMiniTimer"
			class="ml-2 rounded bg-red-500 px-3 py-1 text-sm font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
		>
			Stop
		</button>
		<p
			v-for="task in taskStore.tasks"
			:key="task.id"
		>
			Tytuł:
			{{ task.title }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from '../store/taskStore';

const taskStore = useTaskStore();

const formattedTime = computed(() => {
	const milliseconds = taskStore.elapsedTime;
	const hours = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
	const minutes = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
	const seconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
	const ms = String(milliseconds % 1000).padStart(3, '0');
	return `${hours}:${minutes}:${seconds}.${ms}`;
});

function stopMiniTimer() {
	taskStore.stopTimer();
}
</script>

<style scoped></style>
