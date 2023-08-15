import { serializeNonPOJOs } from '$lib/utils/utils.js';
import { redirect } from '@sveltejs/kit';
export async function load({ locals }) {


    if (!locals.user) {
        throw redirect(303, '/')
    }

    const favorites = await locals.USERS.findById(locals.user._id).populate('bookmarks').exec();


    return {
        favorites: serializeNonPOJOs(favorites),
    };
}





