<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTaskStore } from '../store/taskStore';

const taskStore = useTaskStore();
const selectedTaskId = ref<number | null>(null);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const displayedTime = ref<number>(0);

onMounted(() => {
	if (taskStore.timerStartTime !== null && taskStore.timerTaskId !== null) {
		startTimer(taskStore.timerTaskId);
	}
});

onUnmounted(() => {
	if (intervalId.value !== null) {
		clearInterval(intervalId.value);
	}
});

function startTimer(taskId: number) {
	taskStore.startTimer(taskId);
	intervalId.value = setInterval(() => {
		displayedTime.value = taskStore.elapsedTime;
	}, 10);
}

function stopTimer() {
	if (intervalId.value !== null) {
		clearInterval(intervalId.value);
	}
	taskStore.stopTimer();
}

function formatElapsedTime(milliseconds: number) {
	const hours = Math.floor(milliseconds / 3600000)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((milliseconds % 3600000) / 60000)
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor((milliseconds % 60000) / 1000)
		.toString()
		.padStart(2, '0');
	const millisecondsStr = (milliseconds % 1000).toString().padStart(3, '0');
	return `${hours}:${minutes}:${seconds}.${millisecondsStr}`;
}
</script>

<template>
	<div class="p-8">
		<h2 class="text-2xl font-bold">Timer</h2>
		<div class="mb-4">
			<label
				for="taskSelect"
				class="mb-2 block font-semibold"
				>Wybierz zadanie:</label
			>
			<select
				v-model="selectedTaskId"
				id="taskSelect"
				class="rounded border p-2"
			>
				<option
					:value="null"
					disabled
				>
					Wybierz zadanie...
				</option>
				<option
					v-for="task in taskStore.tasks"
					:key="task.id"
					:value="task.id"
				>
					{{ task.title }}
				</option>
			</select>
		</div>
		<div class="mb-4">
			<button
				@click="startTimer(selectedTaskId!)"
				class="mr-2 rounded bg-green-500 px-3 py-1 text-white"
				:disabled="!selectedTaskId"
			>
				Start
			</button>
			<button
				@click="stopTimer"
				class="rounded bg-red-500 px-3 py-1 text-white"
			>
				Stop
			</button>
		</div>
		<p class="font-mono text-xl">{{ formatElapsedTime(displayedTime) }}</p>
	</div>
</template>
