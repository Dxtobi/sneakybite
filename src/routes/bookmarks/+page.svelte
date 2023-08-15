<script>
	import StareScore from '../../components/StareScore.svelte';

    export let data


    const {favorites} = data;

    //console.log(favorites );
</script>

<div class="p-5">
    {#if favorites?.bookmarks}
    {#each favorites.bookmarks as movies }
    <div class="my-5">
        <img src={movies.movieFile} alt="" class="w-full object-cover h-[300px] rounded-t-xl" />
        <div class="flex justify-between items-center">
            <h1 class="text-2xl uppercase">{movies.title}</h1>
            <StareScore total={movies.totalRating} ratinsnumber={movies.ratingCount}/>
        </div>
    </div>
{/each}
    {/if}
</div>