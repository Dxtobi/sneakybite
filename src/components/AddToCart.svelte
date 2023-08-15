<script>
	import { cartItems } from "../stores/CartStore";

	
let items = 1;
/**
	 * @type {string}
	 */
 export let _id
 let loading = false

function add() {
    if (items >= 10) {
        return
    }
    items += 1
}

function reduce__() {
    if (items <= 1) {
        return
    }
    items -= 1
}


async function addToCart() {
        loading = true
       try {
        const data = {
            items,
        }
        const response = await fetch('/api/customer/cart?foodId='+_id, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(data)

        });

        const res = await response.json();
       
        loading = false
        items = 1;

        cartItems.set(res.items.length)
        console.log(res)
    
       } catch (error) {
        loading = false
        console.log(error)
       }
    }

</script>

<div class="fixed bottom-10 w-[90%] left-0 right-0 bg-[#0007] flex justify-between p-3 rounded-lg text-white m-auto backdrop-blur-[10px]">
    <div class="flex gap-2 items-center">
        <button on:click={reduce__} class="text-xl p-3 rounded-lg flex justify-center items-center bg-[#cbcbcbd6]" >-</button><div>{items}</div><button on:click={add} class="text-xl p-3 rounded-lg flex justify-center items-center bg-[#cbcbcbd6]">+</button>
    </div>
    <button class="text-xl p-3 rounded-lg  bg-[#dd4444d6]" on:click={addToCart} >{loading?"Please wait":"Add"}</button>
</div>