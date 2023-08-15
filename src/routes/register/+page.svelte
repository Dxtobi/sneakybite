<script>
	import { applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';


	/**
	 * @type {string | null}
	 */
	let form = null;

	let name = '';
	let phone = '';
	let email = '';
	let address = '';
	let password = '';
	let sending = false;
	const registerFunction = async () => {
		sending = true;
		const data = {
			name,
			phone,
			email,
			address,
			password
		};
		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		if (result.error) {
			sending = false;
			return form = result.message;
		}
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
      
		}
		


		
		sending = false;
		console.log(result);
		applyAction(result);
    goto('/login')
	};
</script>

<div class="min-h-screen w-full flex items-center flex-col gap-10 pt-10 relative">
	<div class="h-full">
		<img src="/authbg.png" alt="" class="h-full w-full object-cover" />
	</div>

	<div
		class="py-10 absolute top-0 right-0 left-0 w-[90%] m-auto bg-[#ffffff3a] flex flex-col gap-5 justify-center items-center backdrop-blur-[10px] rounded-lg"
	>
		<h1 class="text-xl font-semibold my-1">Register</h1>
		<form method="POST" class="w-[90%]" on:submit|preventDefault={registerFunction}>
			<div class="w-full mb-5">
				<label for="name" class="block text-sm font-medium my-1">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#f54949] bg-transparent"
					bind:value={name}
				/>
			</div>
			<div class="w-full mb-5">
				<label for="email" class="block text-sm font-medium my-1">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#f54949] bg-transparent"
					bind:value={email}
				/>
			</div>
			<div class="w-full mb-5">
				<label for="phone" class="block text-sm font-medium my-1">Phone Number</label>
				<input
					id="phone"
					name="phone"
					type="tel"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#f54949] bg-transparent"
					bind:value={phone}
				/>
			</div>
			<div class="w-full mb-5">
				<label for="address" class="block text-sm font-medium my-1">Your Address</label>
				<input
					id="address"
					name="address"
					type="text"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md border-[#f54949] bg-transparent"
					bind:value={address}
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium my-1">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="mt-1 px-4 py-2 w-full border-2 bg-transparent rounded-md border-[#f54949]"
					bind:value={password}
				/>
			</div>

			{#if form}
				<p class="text-red-800 my-3 capitalize">{form}</p>
			{/if}

			<button
				type="submit"
				class="mt-4 px-6 py-2 bg-[#f54949] text-white rounded-md"
				disabled={sending}>{sending ? 'sending...' : 'Register'}</button
			>
			<div class="mt-4 text-sm text-gray-600">
				Have an account? <a href="/login" class="text-[#f54949] hover:underline">Login</a>
			</div>
		</form>
	</div>
</div>
