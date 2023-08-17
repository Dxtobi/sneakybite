<script>
	import { fly } from "svelte/transition";
    /**
	 * @param {{ [x: string]: string; }} formData
	 */
    function isFormDataEmpty(formData) {
  for (const field in formData) {
    if (formData[field] === "") {
      return true; // Found an empty field
    }
  }
  return false; // No empty fields found
}

/**
	 * @type {boolean}
	 */
 export let displayAddressForm
let formData = {
    name:"",
    mobile:"",
    email:"",
    city:"",
    zipcode:"",
    state:"",
    address:"",
    
};
let loading = false
let error = ""

function submitForm() {
    loading = true
    const isEmpty = isFormDataEmpty(formData);

    if (isEmpty) {
        loading = false;
        return error ="all fields are required"
    } else {
        
    }

    loading = false;
}

</script>


<div  class="absolute overflow-y-scroll mt-28 bottom-10 z-[100] w-[98%] md:w-[40%] m-auto h-[90vh] rounded-lg bg-[#ffffffe3]  p-5 left-0 right-0 inline-block shadow-xl backdrop-blur-[10px]"
 in:fly={{ y: 200, duration: 300, delay: 300 }}
out:fly={{ y: 200, duration: 300 }}>
<h1 class="text-xl">
    Address 
</h1>
    <div>
        <div class="w-full mb-5">
            <label for="name" class="block text-sm font-medium my-1">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                required
                class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#000000] bg-transparent"
                bind:value={formData.name}
            />
        </div>
        <div class="w-full mb-5">
            <label for="email" class="block text-sm font-medium my-1">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                required
                class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#000000] bg-transparent"
                bind:value={formData.email}
            />
        </div>
        <div class="w-full mb-5">
            <label for="tel" class="block text-sm font-medium my-1">Phone</label>
            <input
                id="tel"
                name="tel"
                type="tel"
                required
                class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#000000] bg-transparent"
                bind:value={formData.mobile}
            />
        </div>
        <div class="w-full mb-5">
            <label for="city" class="block text-sm font-medium my-1">City</label>
            <input
                id="city"
                name="city"
                type="text"
                required
                class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#000000] bg-transparent"
                bind:value={formData.city}
            />
        </div>
       

      <div class=" justify-between w-full flex">
        <div class="w-[40%]   mb-5">
            <label for="zipcode" class="block text-sm font-medium my-1">Zip</label>
            <input
                id="zipcode"
                name="zipcode"
                type="tel"
                required
                class="mt-1 p-2  border-2 rounded-md border-[#000000] bg-transparent w-full"
                bind:value={formData.zipcode}
            />
        </div>
        <div class="w-[40%] mb-5">
            <label for="state" class="block text-sm font-medium my-1">State</label>
            <input
                id="state"
                name="state"
                type="state"
                required
                class="mt-1 p-2  border-2 rounded-md border-[#000000] bg-transparent w-full"
                bind:value={formData.state}
            />
        </div>
      </div>

        <div class="w-full mb-5">
            <label for="email" class="block text-sm font-medium my-1">Address</label>
            <input
                id="address"
                name="address"
                type="text"
                required
                class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#000000] bg-transparent"
                bind:value={formData.address}
            />
        </div>
    </div>
    {#if error != ""}
        <div class="text-center my-2 capitalize">{error}</div>
    {/if}
    <div class="flex justify-between items-center mb-10">
		<button on:click={()=>displayAddressForm = !displayAddressForm } class="px-5 py-2 border-2  rounded-sm">Back</button>
		<button class="px-5 py-2 text-[#fff] bg-[#ff7300] rounded-sm"on:click={submitForm} >Place Order</button>
	</div>
</div>