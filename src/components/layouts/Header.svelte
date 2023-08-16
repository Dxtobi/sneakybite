<script>
	import { page } from '$app/stores';
	import CgMenuRight from 'svelte-icons-pack/cg/CgMenuRight';
	import RiFinanceShoppingCartLine from 'svelte-icons-pack/ri/RiFinanceShoppingCartLine';
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import { cartItems } from '../../stores/CartStore';

	let openSideBar = false;
	let items_ = 0;
	
	cartItems.subscribe((items)=>{
		//console.log(items)
		items_ = items
	})

	cartItems.update((items)=>
		 items=$page.data.cartItem
	)

	
</script>

<header class="fixed top-0 left-0 w-full backdrop-blur z-40 bg-[#00000000]">
	<div class="flex p-3 justify-between items-center">
		<button class="custom-text" on:click={() => (openSideBar = !openSideBar)}
			><Icon src={CgMenuRight} size={'25'} /></button
		>

		<a href="/" class="custom-text text-lg">SneakiBit</a>
		{#if $page.data.customer}
			<a href="/mycart" class=" relative" >
				{#if items_ > 0 }
				<div class="flex justify-center items-center rounded-full text-xs w-[20px] h-[20px] text-white  bg-red-700  absolute top-[-10px] right-[-10px]">{items_>9?"9+":items_}</div>
				{/if}
				<Icon src={RiFinanceShoppingCartLine} size={'25'} />
			</a>
		{:else}
			<div>
				<a href="/login" class=" font-bold">LOGIN</a>
			</div>
		{/if}
	</div>
</header>

{#if openSideBar}
	<div
		class="min-h-[50vh] fixed bottom-0 bg-[#c6c5c5a4] w-full rounded-t-2xl flex flex-col gap-5 py-5 backdrop-blur z-40"
		in:fly={{ y: 100, duration: 300 }}
	>
		<button on:click={() => (openSideBar = !openSideBar)} class="w-full p-2 bg-black text-white">Cancel</button>

		<div class=" w-full flex flex-col gap-5 p-3">
			<a href="/bookmarks" class="p-3 w-full capitalize">favorites</a>
			<a href="/bookmarks" class="p-3 w-full capitalize">profile</a>
			<a href="/logout" class="p-3 w-full">Logout</a>
		</div>
	</div>
{/if}
