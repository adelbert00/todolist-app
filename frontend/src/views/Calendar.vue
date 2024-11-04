<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';
import { ref, computed } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const taskStore = useTaskStore();
const selectedDate = ref<string | null>(null);

const events = computed(() => {
	return taskStore.tasks.map((task) => ({
		start: task.dueDate,
		end: task.dueDate,
		title: task.title,
		class: 'bg-green-500',
	}));
});

function viewTasks(day: { date: string }) {
	selectedDate.value = day.date;
	taskStore.fetchTasksByDate(day.date);
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
