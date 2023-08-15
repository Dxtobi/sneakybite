
<script>

// @ts-nocheck



  import { enhance } from '$app/forms';
  
  /**
	 * @type {string}
	 */
  let fileInput
  /**
	 * @param {{ target: { files: any[]; }; }} e
	 */
  function handleFileInputChange(e) {
    fileInput=URL.createObjectURL(e.target.files[0])
  }

   /**
	 * @type {{ user: any; }}
	 */
   export let form

   console.log(form)
</script>

<main class="p-4 bg-white text-black  ">
  <h1 class="text-2xl font-bold mb-4">New Food </h1>
  <form action="?/food" method="POST" use:enhance enctype="multipart/form-data">
    <div class="mb-4 w-full">
      <!-- Hidden file input element -->
      <input
        class="hidden"
        type="file"
        id="imageURL"
        on:change={handleFileInputChange}
        required
        name="imageURL"
      />
      
      <!-- Custom file input button -->
      <label
        for="imageURL"
        class={`cursor-pointer ${!fileInput&& 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded w-full`}
      >
     
        {#if fileInput }
        <img src={fileInput} alt=''/>
        {:else}
        Select photo
      {/if}
    
      </label>
    </div>
    <div class="mb-4">
      <label class="block font-semibold mb-1" for="foodName">Food Name</label>
      <input
        class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        name='foodName'
        type="text"
        id="foodName"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-semibold mb-1" for="price">Price</label>
      <input
        class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        name="price"
        type="currency"
        id="price"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-semibold mb-1" for="timeduration">Time duration from 1 to 5?:</label>
      <input
        class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        min="1" max="5"
        type="range"
        id="timeduration"
        name="timeduration"
        required
      />
    </div>
    
    <div class="mb-4">
      <label class="block font-semibold mb-1" for="category">Ingredients</label>
      <input
        class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        type="text"
        id="ingredients"
        name="ingredients"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-semibold mb-1" for="category">Category</label>
      <input
        class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        type="text"
        id="category"
        name="category"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-semibold mb-1" for="description">Description:</label>
      <textarea
        class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        id="description"
        name="description"
        rows="4"
        required
      ></textarea>
    </div>
    
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      type="submit"
    >
      Upload
    </button>
  </form>

  <div class="my-10"><a
    class="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full my-10"
    href="/adminedite"
  >
    Back
  </a>
</main>
