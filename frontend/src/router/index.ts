import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TaskPage from '../views/TaskPage.vue';
import Calendar from '../views/Calendar.vue';
import Categories from '../views/Categories.vue';
import Timer from '@/components/Timer.vue';

const routes = [
	{ path: '/', component: Home, name: 'Home' },
	{ path: '/tasks', component: TaskPage, name: 'Tasks' },
	{ path: '/calendar', component: Calendar, name: 'Calendar' },
	{ path: '/categories', component: Categories, name: 'Categories' },
	{ path: '/timer', component: Timer, name: 'Timer' },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
