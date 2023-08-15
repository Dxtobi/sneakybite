<script>
    import AiOutlineHeart from "svelte-icons-pack/ai/AiOutlineHeart";
    import AiFillHeart from "svelte-icons-pack/ai/AiFillHeart";
    // @ts-ignore
    import Icon from 'svelte-icons-pack/Icon.svelte';
	import { searchArray } from "$lib/utils/utils.js";
	import { page } from "$app/stores";
    
     /**
	 * @type {{ _id: any; imageURL: any; name: any; totalRating: any; reviewCount: any; }}
	 */
     export let data
    let food = data
    let clickedLike = false

    const handleBookMark = async ()=>{
        try {
        clickedLike = true
        const response = await fetch('/api/customer/food?addToLikesId='+food._id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        });

        food = await response.json();
        console.log(food)
       
        return food
    
       } catch (error) {
        
        console.log(error)
       }
    };

  
</script>

  {#if $page.data.customer}
    {#if searchArray($page.data?.customer?.liked, food._id) || clickedLike}
    <div class="   rounded-full h-[40px] w-[40px] flex justify-center items-center" >
        <Icon src={AiFillHeart} size='30' color='#ff3838'/>
    </div>
    {:else}
    <button class="   rounded-full h-[40px] w-[40px] flex justify-center items-center"  on:click={handleBookMark}>
        <Icon src={AiOutlineHeart} size='30' color='#ff3838' />
    </button>
    {/if}
    {:else}
    <button class="   rounded-full h-[40px] w-[40px] flex justify-center items-center"  disabled>
        <Icon src={AiOutlineHeart} size='30' color='#ff3838' />
    </button>
  {/if}

