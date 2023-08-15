// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Cart, CartModelType } from "./models/cart";
import type { Customer, CustomerModelType } from "./models/customer";
import type { Food, FoodModelType } from "./models/food";
import type { Order, OrderModelType } from "./models/orders";
import type { RatingModelType } from "./models/ratings";
import type { Transaction, TransactionModelType } from "./models/transaction";


declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: () => Promise<void>,
			CUSTOMER: CustomerModelType,
			ORDERS: OrderModelType,
			FOOD: FoodModelType,
			RATING: RatingModelType,
			CART: CartModelType,
			TRANSACTION: TransactionModelType,
			customer: Customer| null,
			foods: Array<Food>,
			orders: Array<Order>,
			transactions: Array<Transaction>,
			cart:Cart
		}
		interface PageData {
			customer: Customer|null,
			foods: Array<Food>,
			orders: Array<Order>,
			transactions: Array<Transaction>,
			cart:Cart
		 }
		// interface Platform {}
	}
}

