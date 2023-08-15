<!-- Rating.svelte -->

<script>
	import RiMapEBike2Line from 'svelte-icons-pack/ri/RiMapEBike2Line';
	import FaSolidStar from 'svelte-icons-pack/fa/FaSolidStar';
	import BsEmojiLaughingFill from 'svelte-icons-pack/bs/BsEmojiLaughingFill';
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';

	export let total = 0;
	export let ratinsnumber = 0;

	/**
	 * @type {number}
	 */
	let rating;

	if (total === 0 || ratinsnumber === 0) {
		rating = 1.2;
	} else {
		rating = total / ratinsnumber;
	}
	//const rating1 = Math.floor(ratinsnumber/total)

	//console.log(rating, rating1, ratinsnumber, total, ratinsnumber/total, total/ratinsnumber)
</script>

<div class="">
	<div class="flex justify-between items-center mb-2">
		<div class="flex gap-2 items-center">
			<Icon src={FaSolidStar} color="gold" size="20" />
			<div>{isNaN(Number(rating.toFixed(1))) ? '1.5' : Number(rating.toFixed(1))}</div>
		</div>
		<div class=" flex gap-2 items-center">
			<Icon src={RiMapEBike2Line} size="20" />
			<div>400</div>
		</div>
	</div>
</div>

<style>
	/* Add any custom styles here */
</style>
