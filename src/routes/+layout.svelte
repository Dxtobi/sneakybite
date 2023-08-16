<script>
	import { fly } from 'svelte/transition'

	import PageLoader from './../components/loaders/PageLoader.svelte';
	import Header from '../components/layouts/Header.svelte';
	import './styles.css';
	import Analytics from '../components/Analytics.svelte';
    
	
	export let data
	
	

</script>
<Analytics/>

<div class="w-full">
	<Header />
	<PageLoader/>
	{#key data.url}
		<main
		in:fly={{ x: -200, duration: 300, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}
		 class="w-full py-16 md:w-1/2 m-auto">
			
			<slot />
		</main>
	{/key}
	

	<footer>
		
	</footer>
</div>

