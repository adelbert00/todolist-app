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
const categoryId = ref<number | null>(null);
const newCategoryName = ref('');
const showCalendar = ref(false);

onMounted(() => {
	categoryStore.fetchCategories();
});

async function addTask() {
	const newTask: Task = {
		id: Date.now(),
		title: title.value,
		description: description.value,
		dueDate: dueDate.value,
		dueTime: dueTime.value,
		status: status.value,
		categoryId: categoryId.value ?? undefined,
	};
	await taskStore.addTask(newTask);
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
	categoryId.value = null;
}
</script>

<template>
	<div class="tasks-container mx-auto mb-4 max-w-md rounded bg-white p-4 shadow-lg">
		<h2 class="mb-4 text-lg font-bold">Dodaj Zadanie</h2>
		<div class="mb-4">
			<label
				class="mb-1 block font-semibold"
				for="title"
				>Tytuł</label
			>
			<input
				v-model="title"
				type="text"
				id="title"
				class="w-full rounded border p-2"
				placeholder="Wprowadź tytuł zadania"
			/>
		</div>

		<div class="mb-4">
			<label
				class="mb-1 block font-semibold"
				for="description"
				>Opis</label
			>
			<textarea
				v-model="description"
				id="description"
				class="w-full rounded border p-2"
				placeholder="Wprowadź opis zadania"
			></textarea>
		</div>

		<div class="mb-4">
			<label
				class="mb-1 block font-semibold"
				for="dueDate"
				>Termin</label
			>
			<input
				v-model="dueDate"
				type="date"
				id="dueDate"
				class="w-full cursor-pointer rounded border p-2"
				@focus="showCalendar = true"
				@blur="showCalendar = false"
			/>
		</div>

		<div class="mb-4">
			<label
				class="mb-1 block font-semibold"
				for="dueTime"
				>Godzina</label
			>
			<input
				v-model="dueTime"
				type="time"
				id="dueTime"
				class="w-full rounded border p-2"
			/>
		</div>

		<div class="mb-4">
			<label
				class="mb-1 block font-semibold"
				for="status"
				>Status</label
			>
			<select
				v-model="status"
				id="status"
				class="w-full rounded border p-2"
			>
				<option value="pending">Oczekujące</option>
				<option value="in_progress">W toku</option>
				<option value="completed">Zakończone</option>
			</select>
		</div>

		<div class="mb-4 flex items-center">
			<input
				v-model="newCategoryName"
				type="text"
				class="mr-2 w-full rounded border p-2"
				placeholder="Dodaj nową kategorię"
			/>
			<button
				@click="addCategory"
				class="rounded bg-blue-500 px-4 py-2 text-white"
			>
				Dodaj
			</button>
		</div>

		<div class="mb-4">
			<label
				class="mb-1 block font-semibold"
				for="categoryId"
				>Kategoria</label
			>
			<select
				v-model="categoryId"
				id="categoryId"
				class="w-full rounded border p-2"
			>
				<option
					v-for="category in categoryStore.categories"
					:key="category.id"
					:value="category.id"
				>
					{{ category.name }}
				</option>
			</select>
		</div>

		<button
			@click="addTask"
			class="w-full rounded bg-green-500 py-2 text-white"
		>
			Dodaj Zadanie
		</button>
	</div>
</template>
