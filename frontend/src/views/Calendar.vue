<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';
import { computed } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const taskStore = useTaskStore();

const events = computed(() => {
	return taskStore.tasks.map((task) => ({
		start: `${task.dueDate}T${task.dueTime || '00:00'}`,
		end: `${task.dueDate}T${task.dueTime || '00:00'}`,
		title: task.title,
		class: 'bg-green-500 text-white',
	}));
});

function viewTasks(day: { date: string }) {
	console.log(
		`Zadania dla dnia ${day.date}:`,
		taskStore.tasks.filter((task) => task.dueDate === day.date),
	);
}
</script>

<template>
	<div class="p-8">
		<VueCal
			:events="events"
			default-view="month"
			@cell-click="viewTasks"
			class="rounded-lg bg-gray-100 p-4 shadow"
		/>
	</div>
</template>

<style scoped></style>
