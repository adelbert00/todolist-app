import { defineStore } from 'pinia';
import { Task } from '../types';

export const useTaskStore = defineStore('taskStore', {
	state: () => ({
		tasks: [] as Task[],
		timerTaskId: null as number | null,
		timerStartTime: null as number | null,
		timerIntervalId: null as number | null,
		elapsedTime: 0,
		isTimerRunning: false,
	}),
	actions: {
		async fetchTasks() {
			this.tasks = [...this.tasks];
		},
		async addTask(task: Task) {
			this.tasks.push(task);
		},
		async updateTask(updatedTask: Task) {
			const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
			if (index !== -1) {
				this.tasks.splice(index, 1, updatedTask);
			}
		},
		async deleteTask(id: number) {
			this.tasks = this.tasks.filter((task) => task.id !== id);
		},
		startTimer(taskId: number) {
			if (this.timerIntervalId !== null) {
				clearInterval(this.timerIntervalId);
			}

			this.timerTaskId = taskId;
			this.timerStartTime = Date.now() - this.elapsedTime;
			this.isTimerRunning = true;

			this.timerIntervalId = setInterval(() => {
				this.elapsedTime = Date.now() - (this.timerStartTime || 0);
			}, 10) as unknown as number;
		},
		stopTimer() {
			if (this.timerTaskId !== null && this.timerStartTime !== null) {
				const task = this.tasks.find((t) => t.id === this.timerTaskId);
				if (task) {
					task.duration = (task.duration || 0) + this.elapsedTime;
				}
			}

			if (this.timerIntervalId !== null) {
				clearInterval(this.timerIntervalId);
			}
			this.timerTaskId = null;
			this.timerStartTime = null;
			this.timerIntervalId = null;
			this.elapsedTime = 0;
			this.isTimerRunning = false;
		},
		resetTimer() {
			if (this.timerIntervalId !== null) {
				clearInterval(this.timerIntervalId);
			}
			this.timerTaskId = null;
			this.timerStartTime = null;
			this.timerIntervalId = null;
			this.elapsedTime = 0;
			this.isTimerRunning = false;
		},
		async logTime(taskId: number, duration: number) {
			const task = this.tasks.find((t) => t.id === taskId);
			if (task) {
				task.duration = (task.duration || 0) + duration;
			}
		},
	},
});
