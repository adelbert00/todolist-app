<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { Task } from '../types';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const title = ref('');
const description = ref('');
const dueDate = ref('');
const dueTime = ref('');
const status = ref<'pending' | 'in_progress' | 'completed'>('pending');
const priority = ref<'high' | 'medium' | 'low'>('medium');
const categoryId = ref<number | null>(null);
const newCategoryName = ref('');

onMounted(() => {
	categoryStore.fetchCategories();
});

async function addTask(startImmediately = false) {
	const newTask: Task = {
		id: Date.now(),
		title: title.value,
		description: description.value,
		dueDate: dueDate.value,
		dueTime: dueTime.value,
		status: startImmediately ? 'in_progress' : status.value,
		priority: priority.value,
		categoryId: categoryId.value ?? undefined,
		duration: 0,
	};
	await taskStore.addTask(newTask);
	if (startImmediately) {
		taskStore.startTimer(newTask.id);
	}
	resetForm();
}

async function addCategory() {
	if (newCategoryName.value.trim()) {
		await categoryStore.addCategory({ id: Date.now(), name: newCategoryName.value });
		newCategoryName.value = '';
	}
}

function resetForm() {
	title.value = '';
	description.value = '';
	dueDate.value = '';
	dueTime.value = '';
	status.value = 'pending';
	priority.value = 'medium';
	categoryId.value = null;
}
</script>

<template>
	<div class="task-form-container mx-auto mb-4 max-w-7xl rounded-md bg-white p-4 shadow-md">
		<div class="flex items-center space-x-4">
			<input
				v-model="title"
				type="text"
				placeholder="What are you working on?"
				class="flex-1 rounded border p-2 text-sm"
			/>
			<input
				v-model="newCategoryName"
				type="text"
				placeholder="Add new category"
				class="flex-1 rounded border p-2 text-sm"
			/>
			<button
				@click="addCategory"
				class="rounded bg-purple-500 px-4 py-2 text-sm font-semibold text-white"
			>
				Add
			</button>
			<select
				v-model="categoryId"
				class="rounded border p-2 text-sm"
			>
				<option :value="null">Select Project</option>
				<option
					v-for="category in categoryStore.categories"
					:key="category.id"
					:value="category.id"
				>
					{{ category.name }}
				</option>
			</select>

			<select
				v-model="priority"
				class="rounded border p-2 text-sm"
			>
				<option value="high">High</option>
				<option value="medium">Medium</option>
				<option value="low">Low</option>
			</select>

			<input
				v-model="dueDate"
				type="date"
				class="rounded border p-2 text-sm"
				placeholder="Due Date"
			/>
			<input
				v-model="dueTime"
				type="time"
				class="rounded border p-2 text-sm"
				placeholder="Due Time"
			/>

			<select
				v-model="status"
				class="rounded border p-2 text-sm"
			>
				<option value="pending">Pending</option>
				<option value="in_progress">In Progress</option>
				<option value="completed">Completed</option>
			</select>

			<button
				@click="addTask(true)"
				class="rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
			>
				Start
			</button>

			<button
				@click="addTask(false)"
				class="rounded bg-green-500 px-4 py-2 text-sm font-semibold text-white"
			>
				Add
			</button>
		</div>
	</div>
</template>

<style scoped></style>
