<script>
    export let data

    let cart_items = [...data.cart?.items]
    console.log(cart_items[0]);
   
</script>



<div class="p-5 mb-[100px]">
   <div class="flex justify-between mb-10">
    <h2 class="text-2xl font-bold">Cart</h2>
    <div class="  rounded-sm bg-black h-[30px] w-[50px] text-center grid place-content-center text-white">{cart_items.length}</div>
   </div>

    <div>
        {#each cart_items as item }
            <div class="flex justify-between mb-3">
                <div class="flex items-start">
                    <img class="w-[60px] h-[60px] rounded-lg mr-3" src={item.food.imageURL} alt=""/>
                    <div class="capitalize">
                        <p class="text-xl font-semibold">{item.food.name}</p>
                        <p class="text-gray-600">₦{item.food.price}</p>
                    </div>

                </div>
                <div class="flex items-center gap-3 w-[30%] justify-between">
                   <button class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px]">+</button><p class="w-[30%] text-center">{item.quantity}</p><button class="text-white text-2xl rounded-sm bg-black h-[30px] w-[30px]">-</button>
                </div>

            </div>
        {/each}
    </div>
</div>


<div class="fixed bottom-0 w-[90%] m-auto rounded-lg bg-white h-[200px] p-5 left-0 right-0">
    <div class="flex justify-between items-center"><div>6</div><div>₦40,000</div></div>
    <div class="flex justify-between items-center">
        <a href="/">Back</a>
        <button >Place Order</button>
    </div>
</div>