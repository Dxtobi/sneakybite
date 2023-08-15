<script>
	import { navigating } from '$app/stores';
	import PageLoader from './../components/loaders/PageLoader.svelte';
	import Header from '../components/layouts/Header.svelte';
	import './styles.css';
	import Analytics from '../components/Analytics.svelte';
    
	
	
	
	

</script>
<Analytics/>

<div class="w-full">
	<Header />
	<PageLoader/>
	
	<main class="w-full py-16 md:w-1/2 m-auto">
		
		<slot />
	</main>

	<footer>
		
	</footer>
</div>

