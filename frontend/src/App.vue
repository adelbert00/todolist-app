<template>
	<div class="flex min-h-screen flex-col">
		<div class="flex flex-grow">
			<Sidebar />

			<div class="ml-52 flex-grow">
				<Navbar />
				<router-view class="flex-grow p-4" />
				<FloatingTimer />
			</div>
		</div>

		<Footer class="ml-52" />
	</div>
</template>

<script lang="ts">
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import FloatingTimer from './components/FloatingTimer.vue';

export default {
	components: { Sidebar, Navbar, Footer, FloatingTimer },
};
</script>
