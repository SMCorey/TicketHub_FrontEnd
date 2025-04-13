<script lang="ts">
    import '../app.css';
	import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    let { children } = $props();
</script>

<div class="min-h-screen bg-gray-300">
    <Header />
    <main>
        {@render children()}
    </main>
    <Footer />
</div>