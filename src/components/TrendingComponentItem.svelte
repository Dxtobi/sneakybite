<script>
	import BookmarkComponent from './BookmarkComponent.svelte';
	import StareScore from './StareScore.svelte';

	
	  /**
	 * @type {{ _id: any; imageURL: any; name: any; totalRating: any; reviewCount: any; }}
	 */
	 export let food;
</script>

<div class="scroll-item ml-3  w-[60vw]  p-2 bg-[#ffffff] rounded-lg ">
	<a href={`/food/${food._id}`} class="  rounded-2xl ">
		<img src={food.imageURL} alt="" class="w-[100%] h-[100px] rounded-lg object-cover" />
		<div class="absolute right-2 top-3">
			<BookmarkComponent data={food} />
		</div>
	</a>
	<div class="w-full overflow-scroll hide-scroll">
		<h1 class=" capitalize my-1 ">{food.name}</h1>
    <StareScore total={food.totalRating} ratinsnumber={food.reviewCount}/>
	</div>
</div>
