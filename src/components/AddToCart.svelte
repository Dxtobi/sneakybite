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
        if (response.ok) {
            loading = false;
            items = 1;

            return cartItems.set(res.items.length);
        }

        
       
        loading = false
        items = 1;

       
        console.log(response)
    
       } catch (error) {
        loading = false
        console.log(error)
       }
    }

</script>

<div class="fixed bottom-10 w-[90%] left-0 right-0 bg-[#ffffff79] flex justify-between p-3 rounded-lg text-white m-auto backdrop-blur-[10px]">
    <div class="flex gap-2 items-center">
        <button on:click={reduce__} class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px] mr-2" >-</button><div class="w-[30%] text-center text-black">{items}</div><button on:click={add} class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px] ">+</button>
    </div>
    <button class="text-white  rounded-sm bg-[#ff7300] p-2" on:click={addToCart} >{loading?"Please wait":"Add"}</button>
</div>