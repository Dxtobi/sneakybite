<script>
	import { ToCurrency } from '$lib/utils/utils.js';
	import RiSystemDeleteBinLine from 'svelte-icons-pack/ri/RiSystemDeleteBinLine';
	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import UserAdressForm from '../../components/UserAdressForm.svelte';
	export let data;
    let requesting = false;
	let cart_items = data.cart?.items;
	let displayAddressForm = false;
	$: total_price = totalPrice(cart_items);

	/**
	 * @param {{ _id: string; }} item
	 * @param {string} actionType
	 */
	async function updateCartItem(item, actionType) {
        requesting =true
		if (!cart_items) {
			return;
		}

		if (actionType === '+') {
			const response = await fetch(`/api/customer/cart?type=adding&itemIdToUpdate=${item._id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const result = await response.json();
			if (response.ok) {
				cart_items = result.items;
			}
			//console.log(result);
		}
		if (actionType === '-') {
			const response = await fetch(`/api/customer/cart?type=removing&itemIdToUpdate=${item._id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const result = await response.json();
			if (response.ok) {
				cart_items = result.items;
			}
			//console.log(result);
		}
		if (actionType === 'delete') {
			const response = await fetch(`/api/customer/cart?type=removing&itemIdToUpdate=${item._id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const result = await response.json();
			if (response.ok) {
				cart_items = result.items;
			}
			//console.log(result);
		}

        requesting =false
	}

	/**
	 * @param {string | any[]} arr
	 */
	function totalPrice(arr) {
		// //console.log(cart_items)
		if (cart_items?.length > 0) {
			//console.log('---', cart_items)
			let all_price = 0;
			for (let index = 0; index < arr.length; index++) {
				all_price += Number(arr[index]?.food.price) * Number(arr[index].quantity);
			}

			return all_price;
		}
		return 0;
	}
</script>

<div class="p-5 mb-[100px]">
	<div class="flex justify-between mb-10">
		<h2 class="text-2xl font-bold">Cart</h2>
		<div
			class="  rounded-sm bg-black h-[30px] w-[50px] text-center grid place-content-center text-white"
		>
			{!cart_items ? 0 : cart_items.length}
		</div>
	</div>
<div class="text-center h-[20px] my-10">{requesting? 'Updating...' : ''}</div>
	<div>
		{#if cart_items}
			{#each cart_items as item}
				<div class="flex justify-between bg-white p-3">
					<div class="flex items-start">
						<img class="w-[60px] h-[60px] rounded-lg mr-3" src={item?.food.imageURL} alt="" />
						<div class="capitalize">
							<p class="text-xl font-semibold">{item?.food.name}</p>
							<p class="text-gray-600">{ToCurrency.format(item?.food.price * item.quantity)}</p>
						</div>
					</div>
					<div class="flex items-center gap-3 w-[30%] justify-between">
						<button
							class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px]"
							on:click={() => updateCartItem(item, '+')} disabled={requesting || item.quantity >= 10}>+</button
						>
						<p class="w-[30%] text-center">{item.quantity}</p>
						{#if item.quantity >= 2}
							<button
								on:click={() => updateCartItem(item, '-')} disabled={requesting}
								class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px]">-</button>
						{:else}
							<button
								on:click={() => updateCartItem(item, 'delete')}
								class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px]" disabled={requesting}
								><Icon src={RiSystemDeleteBinLine} color="#fff" /></button
							>
						{/if}
					</div>
				</div>
				<button on:click={() => updateCartItem(item, 'delete')} disabled={requesting} class=" bg-[#ffffff] mb-5 p-2 w-fit">
					<Icon src={RiSystemDeleteBinLine} color="#464646" />
				</button>
			{/each}
		{:else}
			<div>
				<h2 class="capitalize">You Have Nothing On your cart</h2>
			</div>
		{/if}
	</div>
</div>

<div class="z-[77] fixed bottom-0 w-[90%] md:w-[23%]   rounded-lg bg-[#ffffffc6] h-[200px] p-5 left-0 right-0 md:right-1 md:left-auto md:m-4 md:bottom-5 m-auto inline-block backdrop-blur-[5px] shadow-xl ">
	<div class="flex justify-between items-center mb-5 border-2 border-[#141414] p-1">
		<div>{!cart_items ? 0 : cart_items.length} items</div>
		<div
			class="  rounded-sm bg-[#ff7300] h-[30px] px-4 text-center grid place-content-center text-white"
		>
			{ToCurrency.format(total_price)}
		</div>
	</div>
	<div class="flex justify-between items-center">
		<a href="/" class="px-5 py-2 border-2 border-[#141414] rounded-sm">Back</a>
		<button class="px-5 py-2 bg-[#ff7300] text-white rounded-sm" disabled={requesting} on:click={()=>displayAddressForm = !displayAddressForm }>Place Order</button>
	</div>
</div>

{#if displayAddressForm}
<UserAdressForm bind:displayAddressForm={displayAddressForm} />
{/if}
