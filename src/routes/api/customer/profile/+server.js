
import { error, json } from '@sveltejs/kit';


//UPDATE CUSTOMER PROFILE
export async function PUT({ url, locals }) {

    if (!locals.customer) {
        throw error(400, 'something went wrong');
    }
    const addToLikesId = url.searchParams.get('addToLikesId');
    await locals.CUSTOMER.findByIdAndUpdate(locals.customer?._id,
        { "$push": { "liked": addToLikesId } },
        { "new": true, "upsert": true },);
       
        
    const resp = await locals.FOOD.findById(addToLikesId)
    if (!resp) {
        console.log(resp)
        throw error(400, 'something went wrong');
    }
    //console.log(resp)
        return json(resp) ;
    
}