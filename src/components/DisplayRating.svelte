
<!-- Rating.svelte -->

<script>
	
    import AiFillStar from "svelte-icons-pack/ai/AiFillStar";
    // @ts-ignore
    import Icon from 'svelte-icons-pack/Icon.svelte';

	
	export let rating = 0;
   

	

 
</script>

<div class="flex items-center  gap-1">
	{#each [1, 2, 3, 4, 5] as star}
		<div
			class="w-8 h-8 text-yellow-500 focus:outline-none"
           
		>
       
        {#if star <= rating}
        <Icon src={AiFillStar} color='gold' size='20'/>
        {:else}
        <Icon src={AiFillStar} color='#000000' size='20'/>
        {/if}
    </div>
	{/each}
</div>

<style>
	/* Add any custom styles here */
</style>
