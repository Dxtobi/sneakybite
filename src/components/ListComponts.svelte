<script>
	import { ToCurrency } from '$lib/utils/utils';
	import BookmarkComponent from './BookmarkComponent.svelte';
	import StarScoreIndex from './StarScoreIndex.svelte';
	import StareScore from './StareScore.svelte';
	


 
  /**
	 * @type {{ _id: string; imageURL: string; name: string; totalRating: any; reviewCount: any; price:number }}
	 */
   export let food

 //console.log(food)
   
</script>

<div class=" relative w-full bg-white rounded-lg p-2 mb-3 aspect-auto inline-block">
  <a href={`/food/${food._id}`} class=" rounded-2xl my-2 w-full">
    <img src={food.imageURL} alt='' class="w-full  rounded-lg object-cover"/>
   
  </a>
  <div class="absolute right-2 top-2">
    <BookmarkComponent data={food}/> 
   </div>
  <div class="">
    <h1 class="capitalize my-2">{food.name} | {ToCurrency.format(food.price)}</h1>
    <StarScoreIndex total={food.totalRating} ratinsnumber={food.reviewCount} />
  </div>
</div>

