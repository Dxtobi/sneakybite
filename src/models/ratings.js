/**
 * @fileoverview Rating Module - Defines the Rating schema and model for a food delivery app.
 * @module models/rating
 */

import mongoose from 'mongoose';

/**
 * Represents a Rating in the database.
 * @typedef {import('mongoose').Model<Rating & import('mongoose').Document>} RatingModelType
 * @typedef {Object} Rating
 * @property {string} _id - Rating's id.
 * @property {mongoose.Schema.Types.ObjectId} customer - ObjectId referencing the Customer who gave the rating.
 * @property {mongoose.Schema.Types.ObjectId} food - ObjectId referencing the Food item being rated.
 * @property {number} value - Rating value given by the customer (e.g., 1 to 5).
 * @property {string} comment - Optional comment provided by the customer.
 * @property {Date} createdAt - Timestamp of when the Rating was created.
 * @property {Date} updatedAt - Timestamp of when the Rating was last updated.
 */

/**
 * Mongoose schema for Rating.
 * @type {mongoose.Schema}
 */
const RatingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Rating Model for the food delivery app's MongoDB.
 * @type {RatingModelType}
 */
export const RatingModel = mongoose.models.Rating ?? mongoose.model('Rating', RatingSchema);
