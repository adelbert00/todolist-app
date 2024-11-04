<script setup lang="ts">
import { ref, watchEffect, defineProps } from 'vue';
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { Task, Category } from '../types';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

const props = defineProps<{ task?: Task }>();

const title = ref(props.task?.title || '');
const description = ref(props.task?.description || '');
const dueDate = ref(props.task?.dueDate || '');
const status = ref<'pending' | 'in_progress' | 'completed'>(props.task?.status || 'pending');
const categoryId = ref<number | null>(props.task?.categoryId || null);
const newCategoryName = ref<string>('');

watchEffect(() => {
	if (props.task) {
		title.value = props.task.title;
		description.value = props.task.description;
		dueDate.value = props.task.dueDate;
		status.value = props.task.status || 'pending';
		categoryId.value = props.task.categoryId || null;
	}
});

async function saveTask() {
	const newTask: Task = {
		id: props.task?.id || Date.now(),
		title: title.value,
		description: description.value,
		dueDate: dueDate.value,
		status: status.value,
		categoryId: categoryId.value ?? undefined,
	};

	if (props.task) {
		await taskStore.updateTask(newTask);
	} else {
		await taskStore.addTask(newTask);
	}
	resetForm();
}

function addCategory() {
	const newCategory: Category = {
		id: Date.now(),
		name: newCategoryName.value,
	};
	categoryStore.addCategory(newCategory);
	newCategoryName.value = '';
}
function resetForm() {
	title.value = '';
	description.value = '';
	dueDate.value = '';
	status.value = 'pending';
	categoryId.value = null;
}
</script>

<template>
	<form
		@submit.prevent="saveTask"
		class="mx-auto max-w-md space-y-4 rounded-md bg-white p-6 shadow-md"
	>
		<h2 class="text-2xl font-semibold">{{ props.task ? 'Edit Task' : 'Add New Task' }}</h2>
		<input
			v-model="title"
			placeholder="Title"
			required
			class="w-full rounded border p-2"
		/>
		<textarea
			v-model="description"
			placeholder="Description"
			class="w-full rounded border p-2"
		></textarea>
		<input
			type="date"
			v-model="dueDate"
			class="w-full rounded border p-2"
		/>
		<select
			v-model="status"
			class="w-full rounded border p-2"
		>
			<option value="pending">Pending</option>
			<option value="in_progress">In Progress</option>
			<option value="completed">Completed</option>
		</select>
		<select
			v-model="categoryId"
			class="w-full rounded border p-2"
		>
			<option
				value=""
				disabled
			>
				Select Category
			</option>
			<option
				v-for="category in categoryStore.categories"
				:key="category.id"
				:value="category.id"
			>
				{{ category.name }}
			</option>
		</select>
		<div class="flex space-x-2">
			<input
				v-model="newCategoryName"
				placeholder="New Category Name"
				class="w-full rounded border p-2"
			/>
			<button
				@click="addCategory"
				class="rounded bg-blue-500 p-2 text-white"
			>
				Add Category
			</button>
		</div>
		<button
			type="submit"
			class="w-full rounded bg-blue-500 p-2 text-white"
		>
			{{ props.task ? 'Save Changes' : 'Add Task' }}
		</button>
	</form>
</template>

<style scoped></style>
