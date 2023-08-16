/**
 * @fileoverview Cart Module - Defines the Cart schema and model for a food delivery app.
 * @module models/cart
 */

import mongoose from 'mongoose';

/**
 * Represents a Cart in the database.
 * @typedef {import('mongoose').Model<Cart & import('mongoose').Document>} CartModelType
 * @typedef {Object} Cart
 * @property {string} _id - Cart's id.
 * @property {mongoose.Schema.Types.ObjectId} customer - ObjectId referencing the Customer who owns the cart.
 * @property {Array.<CartItem>} items - Array of CartItem objects representing the items in the cart.
 * @property {Date} createdAt - Timestamp of when the Cart was created.
 * @property {Date} updatedAt - Timestamp of when the Cart was last updated.
 */

/**
 * Represents an item in the cart.
 * @typedef {Object} CartItem
 * @property {mongoose.Schema.Types.ObjectId} food - ObjectId referencing the Food item.
 * @property {number} quantity - Quantity of the Food item in the cart.
 */

/**
 * Mongoose schema for Cart.
 * @type {mongoose.Schema}
 */
const CartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Cart Model for the food delivery app's MongoDB.
 * @type {CartModelType}
 */
export const CartModel = mongoose.models.Cart ?? mongoose.model('Cart', CartSchema);
