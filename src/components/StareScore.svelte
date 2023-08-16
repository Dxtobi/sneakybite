<!-- Rating.svelte -->

<script>
	
	import FaSolidStar from 'svelte-icons-pack/fa/FaSolidStar';
	import BsEmojiLaughingFill from 'svelte-icons-pack/bs/BsEmojiLaughingFill';
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';

	export let total = 0;
	export let ratinsnumber = 0;
    /**
	 * @type {number}
	 */
    let rating

    if (total===0 || ratinsnumber===0) {
        rating = 1.20
    }else{

        rating = total / ratinsnumber;
    }
   
   
	//const rating1 = Math.floor(ratinsnumber/total)

	//console.log(rating, rating1, ratinsnumber, total, ratinsnumber/total, total/ratinsnumber)
</script>

<div class="">
	<div class="flex justify-between items-center mb-2">
        <div class="flex">
            {#each [1, 2, 3] as user, i}
                {#if i != 0}
                <div class="-ml-2 w-[30px] h-[30px] rounded-full border-2 border-white">
                    <img
                     src="https://cdn.dribbble.com/userupload/3719041/file/original-a961817c221095421997301577064fe4.png?resize=1024x768"
                     alt="" 
                     class="w-full h-full rounded-full"
    
                    />
                </div>
                {:else}
                <div class=" w-[30px] h-[30px] rounded-full border-2 border-white">
                    <img
                     src="https://cdn.dribbble.com/userupload/3719041/file/original-a961817c221095421997301577064fe4.png?resize=1024x768"
                     alt="" 
                     class="w-full h-full rounded-full"
    
                    />
                </div>
                {/if}
            {/each}
        </div>
        <div class="flex gap-2 items-center">
            <Icon src={FaSolidStar} color="gold" size="20" />
            <div>{isNaN( Number(rating.toFixed(1)))?"0": Number(rating.toFixed(1))}</div>
        </div>
    </div>



    <div class="flex justify-between">
        
        <div class="flex gap-2 items-center">
            <Icon src={BsEmojiLaughingFill} size="20" />
            <div>{isNaN(ratinsnumber)?"":ratinsnumber}</div>
        </div>

       

    </div>
</div>

<style>
	/* Add any custom styles here */
</style>
