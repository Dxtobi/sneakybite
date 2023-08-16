import { serializeNonPOJOs } from '$lib/utils/utils.js';


export const load = async ({ locals}) => {
   
    const cart = await locals.CART.findOne({customer:locals.customer?._id}).populate("items.food")

   
    return {
        cart: serializeNonPOJOs(cart),
    };
  };