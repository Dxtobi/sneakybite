
import { error, json } from '@sveltejs/kit';


//UPDATE CUSTOMER BOOKMARKS
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


//POST COMMENT AND RATINGS
export async function POST({ url, locals }) {

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