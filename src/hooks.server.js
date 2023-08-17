//import { serializeNonPOJOs } from '$lib/utils/utils';
import { dbConnect, dbDisconnect } from './utils/db';

import { RatingModel } from './models/ratings';
import { serializeNonPOJOs } from '$lib/utils/utils';
import { CustomerModel } from './models/customer';
import { OrderModel } from './models/orders';
import { FoodModel } from './models/food';
import { CartModel } from './models/cart';
import { TransactionModel } from './models/transaction';
import { AddressDataModel } from './models/location';

// import { serializeNonPOJOs } from '$lib/utils/utils';

export const handle = async ({ event, resolve }) => {
  try {
    // Connect to the MongoDB database and wait for the connection to be established
    await dbConnect();
   
   
    
    // Assign the UserModel to event.locals.UserModel
    event.locals.CUSTOMER =  CustomerModel,
    event.locals.ORDERS =  OrderModel,
    event.locals.FOOD =  FoodModel,
    event.locals.RATING =  RatingModel,
    event.locals.CART =  CartModel,
    event.locals.TRANSACTION =  TransactionModel
    event.locals.ADDRESS =  AddressDataModel
     // console.log(event.locals.USERS)
    
     // find the user based on the session
    //
    const session = event.cookies.get('session-kustomer')
 
    if (!session) {
      // if there is no session load page as normal
     console.log('no-customer')
      return await resolve(event)
    }
   //console.log(session)
    const customer = await event.locals.CUSTOMER.findOne({ userAuthToken: session }).select('-password').exec()
   
  // if `user` exists set `events.local`
    if (customer) {
      console.log('has-customer')
      event.locals.customer =  serializeNonPOJOs(customer._doc)
    //  console.log('locals',event.locals.user)
    } 

    //let timeCalled = 0
    const response = await resolve(event);
   // timeCalled =timeCalled++
   // console.log(event.locals, timeCalled)
    await dbDisconnect();
    return response;
  } catch (error) {
    console.log("from hooks:", error);
    throw error;
  }
};



