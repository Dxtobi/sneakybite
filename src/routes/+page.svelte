<script>
	import TrendingComponentItem from '../components/TrendingComponentItem.svelte';

	import ListComponts from '../components/ListComponts.svelte';

	import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';
	import FaBrandsTelegramPlane from 'svelte-icons-pack/fa/FaBrandsTelegramPlane';
	import AiOutlineWhatsApp from 'svelte-icons-pack/ai/AiOutlineWhatsApp';
	import AiOutlineMail from 'svelte-icons-pack/ai/AiOutlineMail';
	import AiOutlineArrowRight from "svelte-icons-pack/ai/AiOutlineArrowRight";
	import SiTwitter from 'svelte-icons-pack/si/SiTwitter';
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	/**
	 * @type {string | null}
	 */
	let selectedCategory = null;

	export let data;
	const { customer, foods } = data;

	const sortedFood = foods.sort(
		(/** @type {{ reviewCount: number; }} */ a, /** @type {{ reviewCount: number; }} */ b) =>
			b.reviewCount - a.reviewCount
	);

	// Extract the first five food with the highest ratingCount
	const topRatedFood = sortedFood.slice(0, 3);

	// Extract the remaining food
	let famuse = sortedFood.slice(3, 6);
	let remainingFood = sortedFood.slice(6);

	const foodCategory = [
		{ genre: 'Snacks', emoji: '🔥' },
		{ genre: 'Cakes', emoji: '🌍' },
		{ genre: 'Rows', emoji: '🎬' },
		{ genre: 'Pies', emoji: '😂' },
		{ genre: 'Cookies', emoji: '🔫' },
		{ genre: 'Chills', emoji: '🔫' },
		
		// Add more genres and emojis as needed
	];

	const contactList = [
		{
			name: 'Email',
			icon: AiOutlineMail,
			link: 'mailto:akanbijosephtobi@gmail.com?subject=From-Potfoli=',
			color: '#e30707',
			color_lite: '#80B5FF' // Lighter version of LinkedIn blue
		},
		{
			name: 'Twitter',
			icon: SiTwitter,
			link: 'https://twitter.com/programmer_dex',
			color: '#1DA1F2',
			color_lite: '#A7D7FF' // Lighter version of Twitter blue
		},
		{
			name: 'Wapp',
			icon: AiOutlineWhatsApp,
			link: 'https://wa.me/9064923080?text=Hello%20i%20have%20question%20about%20your%20service%20can%20you%20help%3F',
			color: '#25D366',
			color_lite: '#A4F0B4' // Lighter version of WhatsApp green
		},
		{
			name: 'Telgram',
			icon: FaBrandsTelegramPlane,
			link: 'https://t.me/officialextv',
			color: '#0088CC',
			color_lite: '#66B3E6' // Lighter version of Telegram blue
		}
	];

	//console.log($page.data.customer)
	/**
	 * @type {string | any[]}
	 */
	let searched = [];
	let loading = false;
	/**
	 * @type {string}
	 */
	let searchValue;
	async function search() {
		loading = true;
		try {
			if (searchValue.trim() === '') {
				return (loading = false);
			}
			const response = await fetch('/api/food?search=' + searchValue, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});

			searched = await response.json();
			console.log(searched);
			loading = false;
			return searched;
		} catch (error) {
			loading = false;
			console.log(error);
		}
	}

	const selectFoodCategory = (/** @type {string } */ category) => {
		selectedCategory = category;

		remainingFood = foods.filter((/** @type {{ category: string | string[]; }} */ food) =>
			food.category.includes(category.toLocaleLowerCase())
		);
	};
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>FoodieDeliver - Discover and Savor Delightful Food</title>
	<meta
		name="description"
		content="Explore and indulge in a diverse array of culinary delights with our food delivery app. Find menus, reviews, and more."
	/>
	<meta
		name="keywords"
		content="food delivery app, food, cuisine, menus, reviews, order food online, restaurant delivery"
	/>
	<meta name="author" content="@foodiedeliver_app" />

	<!-- Open Graph Meta Tags for Social Sharing -->
	<meta
		property="og:title"
		content="FoodieDeliver - Order and Savor Delightful Food with Ease"
	/>
	<meta
		property="og:description"
		content="Order and savor a variety of culinary delights with FoodieDeliver. Explore menus, read reviews, and more."
	/>
	<meta
		property="og:image"
		content="https://i.pinimg.com/564x/c3/7f/89/c37f891eff73d14d43a1e3ab3aba2ba3.jpg"
	/>
	<meta property="og:url" content="https://foodiedeliverapp.com/" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card Meta Tags for Social Sharing -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="FoodieDeliver - Order and Savor Delightful Food with Ease"
	/>
	<meta
		name="twitter:description"
		content="Order and savor a variety of culinary delights with FoodieDeliver. Explore menus, read reviews, and more."
	/>
	<meta
		name="twitter:image"
		content="https://i.pinimg.com/564x/c3/7f/89/c37f891eff73d14d43a1e3ab3aba2ba3.jpg"
	/>
</svelte:head>


<section class="w-full">
	<div>
		<div class="p-3">
			{#if !customer}
				<div class="flex gap-2 items-center my-3">
					<a href="/login" class=" bg-[#0e0e0e] text-white p-3 rounded-xl">Login</a>
					<a href="/register" class=" bg-[#0e0e0e] text-white p-3 rounded-xl">Register</a>
				</div>
			{:else}
				<div class="mb-8 flex justify-between items-center">
					<div>
						<div>Hi <span class="font-bold">{customer?.name}</span></div>
						<div>Welcome Lets Cook!!</div>
					</div>

					<img src={customer.avatar} alt="" class="w-[50px] rounded-full h-[50px]" />
				</div>

				{#if customer.role.toLowerCase() === 'admin'}
					<div class="flex gap-2 items-center my-3">
						<a href="/newpost" class=" bg-[#ff7622] text-white p-3 rounded-xl">Add To Menu</a>
						<a href="/adminedite" class=" bg-[#ff7622] text-white p-3 rounded-xl">View Menu</a>
					</div>
				{/if}
			{/if}
			<div class=" flex items-center rounded-2xl border-2 bg-[#ffffff] p-1">
				<button class="bg-[#adadad] px-4 py-2 rounded-l-lg" on:click={search}>
					<Icon src={AiOutlineSearch} size="25" color="white" />
				</button>
				<input
					class="w-full px-4 py-2 rounded-2xl bg-[#eaeaea00]"
					type="text"
					id="search"
					name="search"
					placeholder="Cakes"
					bind:value={searchValue}
				/>
			</div>
		</div>
	</div>
</section>

{#if loading}
	<div class="my-2 text-center">loading...</div>
{/if}

{#if searched.length !== 0 && searchValue.length !== 0}
	<div class="grid grid-cols-3 gap-1 md:grid-cols-5 p-3">
		{#each searched as food}
			<ListComponts {food} />
		{/each}
	</div>
{/if}

<section class="mt-4">
	<h2 class="  p-3">Fast Takes</h2>
	<div class="scroll-container">
		{#each topRatedFood as food}
			<TrendingComponentItem {food} />
		{/each}
	</div>
</section>
<section class="p-3 mt-4">
	<h2 class="   my-4">Popular</h2>
	<div class=" scroll-container">
		{#each famuse as fam}	
			<div class="scroll-item   w-[30vw]  p-2 bg-[#ffffff] rounded-lg ">
				<a href={`/food/${fam._id}`} class="  rounded-2xl ">
					<img src={fam.imageURL} alt="" class="w-[100%] h-[100px] rounded-lg object-cover" />
			
				</a>
				<div class="w-full overflow-scroll hide-scroll">
					<h1 class=" capitalize my-1 ">{fam.name}</h1>
				
				</div>
			</div>
			
		{/each}
	</div>
</section>


<!--  -->
<section class={'my-2'}>
	<div class="scroll-container my-2">
		<button
			on:click={() => (remainingFood = sortedFood.slice(5))}
			class={`scroll-item ml-3  text-[#ceb3b3] bg-[#181818] px-3 py-1 rounded-lg`}>Clear</button
		>
		{#each foodCategory as gen}
			<button
				on:click={() => selectFoodCategory(gen.genre)}
				class={`${selectedCategory === gen.genre && ' bg-[#f56262]'} scroll-item  ml-3 bg-[#ffbc00] text-[#ffffff]  px-3 py-1 rounded-lg `}>{gen.genre} </button
			>
		{/each}
	</div>
</section>

<section class="mt-4 p-3">
	<h2 class="  mb-5">Recommended</h2>
	<div class=" colume py-2" >
		<a href="/all"  class="flex justify-between gap-1 p-1  rounded-lg bg-[#fbe5ab] items-center  mb-2 h-[40px]">
			<div class="bg-white rounded-lg w-[35%] h-full flex justify-center items-center shadow-sm"><Icon src={AiOutlineArrowRight} /></div>
			<div class="px-3">View all</div>
		</a>
		{#each remainingFood as food}
			<ListComponts {food} />
		{/each}
	</div>
</section>

<style>
	.colume {
		columns: 2;
		break-inside: avoid;
	}
</style>