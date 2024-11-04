import { defineStore } from 'pinia';
import { Category } from '../types';

export const useCategoryStore = defineStore('categoryStore', {
	state: () => ({
		categories: [] as Category[],
	}),
	actions: {
		async fetchCategories() {
			// Your fetching logic
		},
		async addCategory(category: Category) {
			this.categories.push(category);
		},
	},
});
