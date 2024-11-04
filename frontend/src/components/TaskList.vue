<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';
import { onMounted } from 'vue';
import { Task } from '../types';

const taskStore = useTaskStore();

onMounted(() => {
	taskStore.fetchTasks();
});

function editTask(task: Task) {
	taskStore.editTask(task);
}

function deleteTask(id: number) {
	taskStore.deleteTask(id);
}
</script>

<template>
	<ul class="space-y-4">
		<li
			v-for="task in taskStore.tasks"
			:key="task.id"
			class="flex items-center justify-between rounded bg-gray-100 p-4 shadow"
		>
			<div>
				<h3 class="text-lg font-bold">{{ task.title }}</h3>
				<p class="text-sm">{{ task.description }}</p>
				<p class="text-sm text-gray-600">Due Date: {{ task.dueDate }}</p>
				<p class="text-sm text-gray-600">Status: {{ task.status }}</p>
			</div>
			<div class="flex space-x-2">
				<button
					@click="editTask(task)"
					class="text-blue-500 hover:underline"
				>
					Edit
				</button>
				<button
					@click="deleteTask(task.id)"
					class="text-red-500 hover:underline"
				>
					Delete
				</button>
			</div>
		</li>
	</ul>
</template>

<style scoped></style>
