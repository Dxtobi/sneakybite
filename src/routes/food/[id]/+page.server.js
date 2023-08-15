import { serializeNonPOJOs } from '$lib/utils/utils.js';


export const load = async ({params, locals}) => {
    const { id } = params;
    const data = await locals.FOOD.findById(id)
    const rating = await locals.RATING.find({food:id}).populate('customer').exec();

    return {
        data: serializeNonPOJOs(data),
        ratings:serializeNonPOJOs(rating)
    };
  };