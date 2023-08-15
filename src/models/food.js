/**
 * @fileoverview Food Module - Defines the Food schema and model for a food delivery app.
 * @module models/food
 */

import mongoose from 'mongoose';

/**
 * Represents a Food item in the database.
 * @typedef {import('mongoose').Model<Food & import('mongoose').Document>} FoodModelType
 * @typedef {Object} Food
 * @property {string} _id
 * @property {string} name - Food item's name.
 * 
 * @property {Array.<string>} category - Food item's category type.
 * @property {number} price - Food item's price.
 * @property {Array.<string>} ingredients - Array of ingredients used in the food item.
 * @property {string} imageURL - URL of the food item's image.
 * @property {string} description - Food item's description.
 * @property {boolean} isSpecial - Flag to indicate if the food item is a special dish.
 * @property {Date} createdAt - Timestamp of when the Food item was created.
 * @property {Date} updatedAt - Timestamp of when the Food item was last updated.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} reviews - Array of ObjectIds referencing User's reviews.
 * @property {number} totalRating - Total rating score for the food item (sum of all ratings).
 * @property {number} reviewCount - Total number of reviews given to the food item.
 */

/**
 * Mongoose schema for Food.
 * @type {mongoose.Schema}
 */
const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
      default:[]
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
      default:[]
    },
    imageURL: {
      type: String,
      required: true,
    },
    timeduration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default:''
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    totalRating: {
      type: Number,
      default: 3,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Food Model for the food delivery app's MongoDB.
 * @type {FoodModelType}
 */
export const FoodModel = mongoose.models.Food ?? mongoose.model('Food', FoodSchema);
