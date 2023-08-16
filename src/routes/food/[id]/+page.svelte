
<script>
	import { ToCurrency } from '$lib/utils/utils';

	
  import AddToCart from '../../../components/AddToCart.svelte';
import BookmarkComponent from '../../../components/BookmarkComponent.svelte';
	import DisplayRating from '../../../components/DisplayRating.svelte';
	import RatingComponent from '../../../components/RatingComponent.svelte';
	import StareScore from '../../../components/StareScore.svelte';
    import AiOutlineArrowLeft from "svelte-icons-pack/ai/AiOutlineArrowLeft";
     // @ts-ignore
     import Icon from 'svelte-icons-pack/Icon.svelte';

    export let data
    //console.log(data)
    let food = data.data;
 

    let comments = data.ratings;
    let loading = false;
    let rating = 1;
    let comment = '';

    //console.log(comments)
    /**
	 * @param {{ detail: any; }} event
	 */
    function handleMessage(event) {
		rating = event.detail
	}

    async function SendRating() {
        loading = true
       try {
        if (comment.trim() === '' || rating === 0) {
            return  loading = false
        }

        const data = {
            comment,
            rating,
        }
        const response = await fetch('/api/rating?foodId='+food._id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(data)

        });

        const res = await response.json();
        comments=res.ratings
        food = res.resp
        loading = false
        rating = 1;
        comment = '';
        console.log(res)
    
       } catch (error) {
        loading = false
        console.log(error)
       }
    }
    
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>FoodieDeliver - Discover and Savor Delightful Food</title>
	<meta
		name="description"
		content={food.description}
	/>
	<meta
		name="keywords"
		content="food delivery app, food, cuisine, menus, reviews, order food online, restaurant delivery"
	/>
	<meta name="author" content="@foodiedeliver_app" />

	<!-- Open Graph Meta Tags for Social Sharing -->
	<meta
		property="og:title"
		content={food.name}
	/>
	<meta
		property="og:description"
		content={food.description}
	/>
	<meta
		property="og:image"
		content={food.imageURL}
	/>
	<meta property="og:url" content="https://sneakybite.vercel.app/" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card Meta Tags for Social Sharing -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={food.name}
	/>
	<meta
		name="twitter:description"
		content={food.description}
	/>
	<meta
		name="twitter:image"
		content={food.imageURL}
	/>
</svelte:head>



<div class="">
    <img src={food.imageURL} alt=""/>
    <a href="/" class="fixed top-20 right-3 p-3 bg-[#0000004b] rounded-full h-[50px] flex justify-center items-center w-[50px] border-2 border-[#ffffff] text-white backdrop-blur-[10px]"> <Icon src={AiOutlineArrowLeft} color="white" size="20" /></a>
    <div class="p-5 flex justify-between">
       <div>
            <h1 class="capitalize text-2xl font-bold">{food.name} </h1>    
            <div class="text-lg">{ToCurrency.format(food.price)}</div>
           
            <StareScore total={food.totalRating} ratinsnumber={food.reviewCount}/>
        </div>
      <BookmarkComponent data={food}/>
    </div>
    <div class="flex gap-3 px-5 flex-wrap">
        {#each food.category as gen }
            <div class="capitalize bg-[#ffffff] p-3 rounded-lg">{gen}</div>
        {/each}
    </div>
    <div class="p-5">
        <h1 class=" capitalize text-lg my-3">description:</h1>
        <p class="bg-[#ffffff] p-3 rounded-lg">{food.description}</p>
    </div>
</div>


<h1 class=" capitalize text-lg  p-5">ingredients:</h1>
<div class="flex gap-3 px-5 flex-wrap">
    {#each food.ingredients as gen }
        <div class="capitalize bg-[#ffbc00] text-white p-3 rounded-lg">{gen}</div>
    {/each}
</div>


<section class="p-5">
    <h1 class="capitalize text-lg font-bold mb-4">Comments</h1> 
    
    {#each comments as comment }
        {#if comment?.customer?.name}
            <div class="bg-[#ffffff] p-3 rounded-lg mb-2">
                <h3 class="my-2 capitalize">{comment?.customer?.name}</h3>
                <p class="my-3">{comment.comment ?comment.comment:''}</p>
                <DisplayRating rating={comment.value}/>
            </div>
            {/if}
        {/each}
    

</section>
<div class=" p-5 rounded-lg mb-20">
    <div class="bg-[#ffffff] p-3 rounded-lg ">
        <RatingComponent on:rating={handleMessage} {rating}/>
        <div class="mb-4">
            <label class="block font-semibold mb-1" for="description">Description:</label>
            <textarea
              class="w-full px-4 py-2 border rounded bg-transparent "
              id="description"
              name="description"
              rows="4"
              required
              bind:value={comment}
            ></textarea>
          </div>
          <button on:click={SendRating} class="bg-[#f54949] text-white rounded-lg p-3 px-10">{loading?'Loading...':'Comment'}</button>
    </div>
</div>

<AddToCart _id={food._id}/>    