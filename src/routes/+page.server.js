import { serializeNonPOJOs } from '$lib/utils/utils.js';
export const config = {
    runtime: 'edge',
  };
export const load = async ({ locals }) => {


    try {
       // const customer = await event.locals.CUSTOMER.findOne({ userAuthToken: session }).select('-password').exec()
        const topRatedFoods = await locals.FOOD.find()
            .sort({ ratingCount: -1 }) // Sort in descending order based on ratingCount
            .limit(5);

        const topRatedFoodIds = topRatedFoods.map((/** @type {{ _id: any; }} */ food) => food._id);

        const data = await locals.FOOD.find({ _id: { $nin: topRatedFoodIds } }).sort({ createdAt: -1 }) // Sort in descending order based on ratingCount
            .limit(50);

            const fastFoods = await locals.FOOD.find({ fast: 'fast' }).sort({ createdAt: -1 }) // Sort in descending order based on ratingCount
                .limit(50);
        
        

        //console.log( serializeNonPOJOs({...topRatedFoods, ...data}))
        //console.log(data)
        return {
            foods: serializeNonPOJOs([...topRatedFoods, ...data, ...fastFoods]),
            customer: locals.customer
        };
    } catch (error) {

        console.log('err:', error);
        return {
            foods: [],
            customer: locals.customer
        };
    }
}
