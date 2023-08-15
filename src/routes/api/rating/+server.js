// Implement the logic when a user rates a movie
// For example, in a route handler or controller function



import { error, json } from '@sveltejs/kit';

// @ts-ignore
export async function PUT({ url, request, locals }) {
//console.log('called', await request.json())
if (!locals.customer) {
    throw error(400, 'something went wrong');
}
   try {
    const data = await request.json();
    const food = url.searchParams.get('foodId');
    const customer = locals.customer?._id;
    const ratingValue = data.rating;
    const comment = data.comment;

    // Create a new rating document
    const rating ={
        food,
        customer,
        value: ratingValue,
        comment
       };
       
   // console.log(rating)

    // Create and Save the rating document
    const resp0 = await locals.RATING.create(rating)
   
    if (!resp0) {
        console.log(resp0)
        throw error(400, 'error occurred');
    }
    // Update the Movie model with the new rating information
    const resp = await locals.FOOD.findByIdAndUpdate(
        food,
        {
            $inc: { totalRating: ratingValue, reviewCount: 1 },
        },
        { new: true } // To return the updated document
       );
       
    const ratings = await locals.RATING.find({food:food}).populate('customer').exec();
      // console.log(ratings)
        if (!resp) {
            console.log(resp)
            throw error(400, 'error occurred');
        }
    return json({resp, ratings});

   } catch (err) {
       // @ts-ignore
       console.log(err.message)
       throw error(400, 'error occurred');
       
   }



}
