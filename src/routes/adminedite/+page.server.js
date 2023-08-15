import { serializeNonPOJOs } from '$lib/utils/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (locals.customer?.role.toLocaleLowerCase() != 'admin') {
        throw redirect(303, '/')
    }
  
    const data = await locals.FOOD.find()
     
    return {
       foods:  serializeNonPOJOs(data)
    };
}