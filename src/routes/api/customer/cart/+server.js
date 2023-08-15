
import { error, json } from '@sveltejs/kit';




//POST COMMENT AND RATINGS
export async function POST({request,  url, locals }) {

    if (!locals.customer) {
        throw error(400, 'something went wrong');
    }

    const foodId = url.searchParams.get('foodId');
    let body = await request.json()

    let data = {
        food: foodId,
        quantity:Number(body.items)
    }
    let newData = {
        customer: locals.customer._id,
        items: [data]
    }

    const alreadyExist = await locals.CART.findOne({customer:locals.customer._id})
    if (alreadyExist) {
        await locals.CART.findByIdAndUpdate(alreadyExist._id,
            { "$push": { "items": data } },
            { "new": true, "upsert": true },);
    } else {
        await locals.CART.create(newData)
    }

    
    
       
        
    const resp = await locals.CART.findOne({customer:locals.customer._id}).populate('items.food')
    if (!resp) {
        console.log(resp)
        throw error(400, 'something went wrong');
    }
    //console.log(resp)
        return json(resp) ;
    
}