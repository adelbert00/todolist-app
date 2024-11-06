<template>
	<div class="flex min-h-screen flex-col">
		<Navbar />
		<router-view class="flex-grow" />
		<Footer />
		<FloatingTimer />
	</div>
</template>

<script lang="ts">
import FloatingTimer from './components/FloatingTimer.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
	components: { Navbar, Footer, FloatingTimer },
};
</script>
