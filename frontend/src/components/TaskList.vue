<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { Task } from '../types';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();
const filterStatus = ref<string>('');
const sortBy = ref<string>('dueDate');

const filteredTasks = computed(() => {
	let tasks = taskStore.tasks;

	if (filterStatus.value) {
		tasks = tasks.filter((task: Task) => task.status === filterStatus.value);
	}

	tasks = tasks.slice().sort((a: Task, b: Task) => {
		if (sortBy.value === 'dueDate') {
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		} else if (sortBy.value === 'category') {
			return String(a.categoryId || '').localeCompare(String(b.categoryId || ''));
		} else if (sortBy.value === 'priority') {
			const priorityOrder = { high: 1, medium: 2, low: 3 };
			return priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium'];
		}
		return 0;
	});

	return tasks;
});

function updateTask(task: Task) {
	taskStore.updateTask(task);
}

function stopTask(task: Task) {
	taskStore.stopTimer();
	task.status = 'pending';
	taskStore.updateTask(task);
}

function continueTask(task: Task) {
	taskStore.startTimer(task.id);
	task.status = 'in_progress';
	taskStore.updateTask(task);
}

function formatElapsedTime(milliseconds: number): string {
	const hours = Math.floor(milliseconds / 3600000)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((milliseconds % 3600000) / 60000)
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor((milliseconds % 60000) / 1000)
		.toString()
		.padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}
</script>

<template>
	<div class="task-list-container mx-auto rounded bg-gray-50 p-4 shadow">
		<div class="mb-4 flex justify-between">
			<div>
				<label class="mr-2">Filtruj po statusie:</label>
				<select
					v-model="filterStatus"
					class="rounded border p-1"
				>
					<option value="">Wszystkie</option>
					<option value="pending">Oczekujące</option>
					<option value="in_progress">W trakcie</option>
					<option value="completed">Ukończone</option>
				</select>
			</div>
			<div>
				<label class="mr-2">Sortuj według:</label>
				<select
					v-model="sortBy"
					class="rounded border p-1"
				>
					<option value="dueDate">Data końcowa</option>
					<option value="category">Kategoria</option>
					<option value="priority">Priorytet</option>
				</select>
			</div>
		</div>

		<table class="w-full">
			<thead>
				<tr>
					<th>Tytuł</th>
					<th>Opis</th>
					<th>Priorytet</th>
					<th>Do kiedy</th>
					<th>Godzina</th>
					<th>Status</th>
					<th>Kategoria</th>
					<th class="text-right">Czas</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="task in filteredTasks"
					:key="task.id"
					class="border-b"
				>
					<td>{{ task.title }}</td>
					<td>{{ task.description }}</td>
					<td>{{ task.priority }}</td>
					<td>
						<input
							v-model="task.dueDate"
							type="date"
							class="rounded border p-1"
							@change="updateTask(task)"
						/>
					</td>
					<td>
						<input
							v-model="task.dueTime"
							type="time"
							class="rounded border p-1"
							@change="updateTask(task)"
						/>
					</td>
					<td>
						<select
							v-model="task.status"
							class="rounded border p-1"
							@change="updateTask(task)"
						>
							<option value="pending">Oczekujące</option>
							<option value="in_progress">W trakcie</option>
							<option value="completed">Ukończone</option>
						</select>
					</td>
					<td>
						<select
							v-model="task.categoryId"
							class="rounded border p-1"
							@change="updateTask(task)"
						>
							<option :value="null">Bez Kategorii</option>
							<option
								v-for="category in categoryStore.categories"
								:key="category.id"
								:value="category.id"
							>
								{{ category.name }}
							</option>
						</select>
					</td>
					<td class="text-right">{{ formatElapsedTime(task.duration || 0) }}</td>
					<td>
						<button
							v-if="task.status === 'in_progress'"
							@click="stopTask(task)"
							class="rounded bg-red-500 px-2 py-1 text-white"
						>
							Stop
						</button>
						<button
							v-else
							@click="continueTask(task)"
							class="rounded bg-blue-500 px-2 py-1 text-white"
						>
							Continue
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
