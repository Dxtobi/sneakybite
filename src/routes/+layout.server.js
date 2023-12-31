

export const load = async ({locals, url}) => {
  //console.log(locals.user)
const cart = await locals.CART.findOne({ customer: locals.customer?._id }).populate('items.food')
 
  return {
    customer: locals.customer,
    cartItem: cart ? cart.items?.length : 0,
    url: url.pathname,
  }
};

