import { defineStore } from 'pinia';
import { Category } from '../types';

export const useCategoryStore = defineStore('categoryStore', {
	state: () => ({
		categories: [] as Category[],
	}),
	actions: {
		async fetchCategories() {},
		async addCategory(category: Category) {
			this.categories.push(category);
		},
		async updateCategory(id: number, newName: string) {
			const category = this.categories.find((cat) => cat.id === id);
			if (category) {
				category.name = newName;
			}
		},
		async deleteCategory(id: number) {
			this.categories = this.categories.filter((cat) => cat.id !== id);
		},
	},
});
