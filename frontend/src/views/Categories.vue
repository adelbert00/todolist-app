<script setup lang="ts">
import { ref } from 'vue';
import { useCategoryStore } from '../store/categoryStore';
import { Category } from '../types';

const categoryStore = useCategoryStore();
const newCategoryName = ref<string>('');

function addCategory() {
	const newCategory: Category = {
		id: Date.now(),
		name: newCategoryName.value,
	};
	categoryStore.addCategory(newCategory);
	newCategoryName.value = '';
}
</script>

<template>
	<div class="space-y-4 p-8">
		<h2 class="text-2xl font-semibold">Categories</h2>
		<div class="flex space-x-2">
			<input
				v-model="newCategoryName"
				placeholder="New Category Name"
				class="rounded border p-2"
			/>
			<button
				@click="addCategory"
				class="rounded bg-blue-500 p-2 text-white"
			>
				Add Category
			</button>
		</div>
		<ul class="space-y-2">
			<li
				v-for="category in categoryStore.categories"
				:key="category.id"
				class="rounded bg-gray-100 p-4 shadow"
			>
				{{ category.name }}
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
