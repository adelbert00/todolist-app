<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { onMounted } from 'vue';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

onMounted(() => {
	categoryStore.fetchCategories();
	taskStore.fetchTasks();
});
</script>

<template>
	<div class="space-y-4 p-4">
		<div
			v-for="category in categoryStore.categories"
			:key="category.id"
			class="rounded-md border p-4 shadow-md"
		>
			<h3 class="text-xl font-semibold">{{ category.name }}</h3>

			<ul>
				<li
					v-for="task in taskStore.tasks.filter((task) => task.categoryId === category.id)"
					:key="task.id"
					class="mt-2"
				>
					<h4 class="font-medium">{{ task.title }}</h4>
					<p>{{ task.description }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped></style>
