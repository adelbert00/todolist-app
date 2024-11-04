<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';
import { computed, defineProps } from 'vue';

const props = defineProps<{ taskId: number }>();
const taskStore = useTaskStore();

const task = computed(() => taskStore.tasks.find((t) => t.id === props.taskId) || null);
</script>

<template>
	<div v-if="task">
		<h2>{{ task.title }}</h2>
		<p>{{ task.description }}</p>
		<p>Status: {{ task.status || 'Unknown' }}</p>
		<p>ID: {{ task.id }}</p>
	</div>
	<div v-else>
		<p>Task not found.</p>
	</div>
</template>

<style scoped></style>
