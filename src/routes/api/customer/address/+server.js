import { error, fail, json } from "@sveltejs/kit";



export async function PUT({  url, locals }) {

    try {
     if (!locals.customer) {
         throw error(400, 'something went wrong');
     }
 
     const actionType = url.searchParams.get('type');
     const itemIdToUpdate = url.searchParams.get('itemIdToUpdate');
    
 
     const alreadyExist = await locals.CART.findOne({customer:locals.customer._id,})
     if (alreadyExist && actionType === 'removing') {
        
        await locals.CART.findOneAndUpdate(
             { _id: alreadyExist._id, 'items._id': itemIdToUpdate },
             { $inc: { 'items.$.quantity': -1 } },
             { new: true })
     } else {
         await locals.CART.findOneAndUpdate(
             { _id: alreadyExist._id, 'items._id': itemIdToUpdate },
             { $inc: { 'items.$.quantity': +1 } },
             { new: true })
     }
 
     
     
        
         
     const resp = await locals.CART.findOne({customer:locals.customer._id}).populate('items.food')
     if (!resp) {
         console.log(resp)
         throw fail(400, {error:'something went wrong'});
     }
     
         return json(resp) ;
    } catch (err) {
     throw fail(400, {error:'something went wrong'});
    }
     
 }
 