
<script>

import AiOutlineSearch from "svelte-icons-pack/ai/AiOutlineSearch";
// @ts-ignore
import Icon from 'svelte-icons-pack/Icon.svelte';
    /** @type {import('./$types').PageData} */

    export let data;
    
    let loading = false

    /**
	 * @type {string | any[]}
	 */
    let searched = []

    /**
	 * @param {string} id
	 */
    async function deleteFunc(id) {
        loading = true
       try {
        await fetch('/api/movies?id='+id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        });

       
        loading = false
    
       } catch (error) {
        console.log(error)
        loading = false
       }
    }

    /**
	 * @type {string}
	 */
    let searchValue
    async function search() {
        loading = true
       try {
        if (searchValue.trim() === '') {
            return  loading = false
        }
        const response = await fetch('/api/movies?search='+searchValue, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        searched = await response.json();
        console.log(searched)
        loading = false
        return searched
    
       } catch (error) {
        loading = false
        console.log(error)
       }
    }
</script>


<div class="p-5 ">
    <h2 class="my-10">Admin- Movie List -- {data.foods.length}</h2>

    <div class=" flex items-center border-[#000000] rounded-sm border-2 bg-[#ffffff]">
        <input
          class="w-full px-4 py-2   rounded-2xl bg-transparent"
          type="text"
          id="search"
          name="search"
          placeholder="John Wick"
          bind:value={searchValue}
        />
        <button class="bg-[#ffffff] border px-4 py-2 rounded-r-2xl" on:click={search}>
            <Icon src={AiOutlineSearch} size='25' color='white'/>
        </button>
      </div>
      


    <div class=" w-full flex justify-center items-center my-3"><a href='/newpost' class="p-2 px-5 border-2 rounded-lg">Add to menu</a></div>
    {#if loading}
    <div class="my-2 text-center">loading...</div>
    {/if}
    
    {#if searched.length !== 0 && searchValue.length !== 0}
    {#each searched as food}
        <div class="flex justify-between my-3 items-center">
            <div class="flex gap-3 items-center">
                <img src={food.imageURL} alt='' class="w-[100px] h-[100px] rounded-2xl " />
                <h2 class=" capitalize ">{food.name}</h2>
            </div>
            <button class="p-2 px-5 border-2 rounded-lg border-red-600 h-fit" on:click={()=>deleteFunc(food._id)}>Delete</button>
        </div>
    {/each}
   {:else}
   {#if data.foods.length !== 0}
   {#each data.foods as food}
       <div class="flex justify-between my-3 items-center">
           <div class="flex gap-3 items-center">
               <img src={food.imageURL} alt='' class="w-[100px] h-[100px] rounded-2xl " />
               <h2 class=" capitalize ">{food.name}</h2>
           </div>
           <button class="p-2 px-5 border-2 rounded-lg border-red-600 h-fit" on:click={()=>deleteFunc(food?._id)}>Delete</button>
       </div>
   {/each}
{/if}
{/if}
</div>


