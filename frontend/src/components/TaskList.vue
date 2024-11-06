<script setup lang="ts">
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { Task } from '../types';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

function updateTask(task: Task) {
	taskStore.updateTask(task);
}
</script>

<template>
	<div class="task-list-container mx-auto rounded bg-gray-50 p-4 shadow">
		<table class="mx-auto w-[720px]">
			<thead>
				<tr>
					<th class="text-left">Tytuł</th>
					<th class="text-left">Do kiedy</th>
					<th class="text-left">Status</th>
					<th class="text-left">Kategoria</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="task in taskStore.tasks"
					:key="task.id"
				>
					<td>{{ task.title }}</td>

					<td>
						<input
							v-model="task.dueDate"
							type="date"
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
					<td>
						<button
							@click="taskStore.deleteTask(task.id)"
							class="rounded bg-red-500 px-2 py-1 text-white"
						>
							Usuń
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
