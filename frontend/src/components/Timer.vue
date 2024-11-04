<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useTaskStore } from '../store/taskStore';

const props = defineProps<{ taskId: number }>();
const taskStore = useTaskStore();

const startTime = ref<number | null>(null);
const task = computed(() => taskStore.tasks.find((t) => t.id === props.taskId));

function startTimer() {
	startTime.value = Date.now();
}

function stopTimer() {
	if (startTime.value !== null && task.value) {
		const duration = Date.now() - startTime.value;
		startTime.value = null;
		taskStore.logTime(task.value.id, duration);
	}
}
</script>

<template>
	<div class="flex items-center space-x-2">
		<button
			@click="startTimer"
			class="rounded bg-green-500 p-2 text-white"
		>
			Start Timer
		</button>
		<button
			@click="stopTimer"
			class="rounded bg-red-500 p-2 text-white"
			:disabled="!startTime"
		>
			Stop Timer
		</button>
	</div>
</template>

<style scoped></style>
