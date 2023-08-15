<!-- Rating.svelte -->

<script>
	import { createEventDispatcher } from 'svelte';
   
    import AiFillStar from "svelte-icons-pack/ai/AiFillStar";
    // @ts-ignore
    import Icon from 'svelte-icons-pack/Icon.svelte';

	const dispatch = createEventDispatcher();
	export let rating = 0;
    let hoverRating = 0;
    let isHovering = false;

	// Function to handle rating change
	/**
	 * @param {number} ratingValue
	 */
	function handleRating(ratingValue) {
		
      rating = ratingValue;
      dispatch('rating', rating);
    
	}

    // Function to handle hover
  /**
	 * @param {number} ratingValue
	 */
  function handleHover(ratingValue) {
    hoverRating = ratingValue;
    isHovering = true;
  }

  // Function to handle hover out
  function handleHoverOut() {
    isHovering = false;
  }

 
</script>

<div class="flex items-center justify-center gap-1">
	{#each [1, 2, 3, 4, 5] as star}
		<button
			class="w-8 h-8 text-yellow-500 focus:outline-none"
            on:click={() => handleRating(star)}
            on:mouseover={() => handleHover(star)}
            on:mouseout={handleHoverOut}
            on:blur={handleHoverOut}
            on:focus={() => handleHover(star)}
            type='button'
		>
        {#if isHovering}
        {#if star <= hoverRating}
          <Icon src={AiFillStar} color='gold' size='30'/>
        {:else}
        <Icon src={AiFillStar} color='#000000' size='30'/>
        {/if}
      {:else}
        {#if star <= rating}
        <Icon src={AiFillStar} color='gold' size='30'/>
        {:else}
        <Icon src={AiFillStar} color='#000000' size='30'/>
        {/if}
      {/if}
    </button>
	{/each}
</div>

<style>
	/* Add any custom styles here */
</style>
