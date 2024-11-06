<script setup lang="ts">
import { useCategoryStore } from '../store/categoryStore';
import { ref, onMounted } from 'vue';
import { Category } from '../types';

const categoryStore = useCategoryStore();
const newCategoryName = ref('');

onMounted(() => {
	categoryStore.fetchCategories();
});

async function addCategory() {
	if (newCategoryName.value.trim()) {
		const newCategory: Category = {
			id: Date.now(),
			name: newCategoryName.value.trim(),
		};
		await categoryStore.addCategory(newCategory);
		newCategoryName.value = '';
	}
}

async function editCategory(id: number, newName: string) {
	await categoryStore.updateCategory(id, newName);
}

async function deleteCategory(id: number) {
	await categoryStore.deleteCategory(id);
}
</script>

<template>
	<div class="p-4">
		<h2 class="mb-4 text-2xl font-bold">Kategorie</h2>

		<div class="mb-6 flex items-center">
			<input
				v-model="newCategoryName"
				placeholder="Nowa Kategoria..."
				class="w-full border p-2"
			/>
			<button
				@click="addCategory"
				class="ml-2 h-10 w-24 rounded bg-blue-500 text-sm text-white"
			>
				Dodaj
			</button>
		</div>

		<ul>
			<li
				v-for="category in categoryStore.categories"
				:key="category.id"
				class="mb-4 rounded border p-4 shadow"
			>
				<input
					v-model="category.name"
					@blur="editCategory(category.id, category.name)"
					class="mb-2 w-1/2 border p-2"
				/>
				<button
					@click="deleteCategory(category.id)"
					class="ml-2 h-10 w-24 rounded bg-red-500 text-white"
				>
					Usuń
				</button>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
