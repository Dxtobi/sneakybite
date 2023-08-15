/**
 * @fileoverview Customer Module - Defines the Customer schema and model for a food delivery app.
 * @module models/customer
 */

import mongoose from 'mongoose';

/**
 * Represents a Customer in the database.
 * @typedef {import('mongoose').Model<Customer & import('mongoose').Document>} CustomerModelType
 * @typedef {Object} Customer
 * @property {string} _id - Customer's id.
 * @property {string} role - role.
 * @property {string} avatar - role.
 * @property {string} email - Customer's email address.
 * @property {string} name - Customer's name.
 * @property {string} phoneNumber - Customer's contact phone number.
 * @property {string} address - Customer's delivery address.
 * @property {Array.<string>} liked
 * @property {Array.<mongoose.Schema.Types.ObjectId>} orders - Array of ObjectIds referencing the Customer's orders.
 * @property {Date} createdAt - Timestamp of when the Customer was created.
 * @property {Date} updatedAt - Timestamp of when the Customer was last updated.
 */

/**
 * Mongoose schema for Customer.
 * @type {mongoose.Schema}
 */
const CustomerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default:'USER'
    },
    password: {
      type: String,
      required: true,
    },
    fastFoods: {
      type: String,
      required: true,
      default:'slow'
    },
    avatar: {
      type: String,
      required: true,
      default:'https://cdn.dribbble.com/users/1176657/screenshots/15468294/media/34af996ddff444391edab94abcf3c7f3.png?resize=768x576&vertical=center'
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }],
    liked: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    }],
    userAuthToken: {
      type: String,
      required: true,
      default:''
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Customer Model for the food delivery app's MongoDB.
 * @type {CustomerModelType}
 */
export const CustomerModel = mongoose.models.Customer ?? mongoose.model('Customer', CustomerSchema);
