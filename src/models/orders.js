/**
 * @fileoverview Order Module - Defines the Order schema and model for a food delivery app.
 * @module models/order
 */

import mongoose from 'mongoose';

/**
 * Represents an Order in the database.
 * @typedef {import('mongoose').Model<Order & import('mongoose').Document>} OrderModelType
 * @typedef {Object} Order
 * @property {string} _id - Order's id.
 * @property {mongoose.Schema.Types.ObjectId} customer - ObjectId referencing the Customer who placed the order.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} items - Array of ObjectIds referencing the Food items in the order.
 * @property {number} totalAmount - Total amount for the order.
 * @property {string} status - Status of the order (e.g., "Placed", "In Progress", "Delivered").
 * @property {Date} createdAt - Timestamp of when the Order was created.
 * @property {Date} updatedAt - Timestamp of when the Order was last updated.
 */

/**
 * Mongoose schema for Order.
 * @type {mongoose.Schema}
 */
const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    }],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Placed', 'In Progress', 'Delivered'],
      default: 'Placed',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Order Model for the food delivery app's MongoDB.
 * @type {OrderModelType}
 */
export const OrderModel = mongoose.models.Order ?? mongoose.model('Order', OrderSchema);
