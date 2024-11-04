import { defineStore } from 'pinia';
import { Task } from '../types';

export const useTaskStore = defineStore('taskStore', {
	state: () => ({
		tasks: [] as Task[],
	}),
	actions: {
		async addTask(task: Task) {
			this.tasks.push(task);
		},
		async updateTask(updatedTask: Task) {
			const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
			if (index !== -1) {
				this.tasks.splice(index, 1, updatedTask);
			}
		},
		async fetchTasks() {},
		async deleteTask(id: number) {
			this.tasks = this.tasks.filter((task) => task.id !== id);
		},
		async logTime(taskId: number, duration: number) {
			const task = this.tasks.find((t) => t.id === taskId);
			if (task) {
				task.duration = (task.duration || 0) + duration;
			}
		},
		async fetchTasksByDate(date: string) {
			return this.tasks.filter((task) => task.dueDate === date);
		},
		editTask(task: Task) {
			this.updateTask(task);
		},
	},
});
