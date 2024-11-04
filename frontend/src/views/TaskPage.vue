<template>
	<div>
		<TaskForm />
		<TaskList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';

export default defineComponent({
	name: 'TaskPage',
	components: {
		TaskForm,
		TaskList,
	},
});
</script>
