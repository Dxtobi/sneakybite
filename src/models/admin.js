/**
 * @fileoverview Admin Module - Defines the Admin schema and model for a food delivery app.
 * @module models/Admin
 */

import mongoose from 'mongoose';

/**
 * Represents a Admin in the database.
 * @typedef {import('mongoose').Model<Admin & import('mongoose').Document>} AdminModelType
 * @typedef {Object} Admin
 * @property {string} _id - Admin's id.
 * @property {string} email - Admin's email address.
 * @property {string} name - Admin's name.
 * @property {string} phoneNumber - Admin's contact phone number.
 * @property {string} address - Admin's delivery address.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} orders - Array of ObjectIds referencing the Admin's orders.
 * @property {Date} createdAt - Timestamp of when the Admin was created.
 * @property {Date} updatedAt - Timestamp of when the Admin was last updated.
 */

/**
 * Mongoose schema for Admin.
 * @type {mongoose.Schema}
 */
const AdminSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

/**
 * Admin Model for the food delivery app's MongoDB.
 * @type {AdminModelType}
 */
export const AdminModel = mongoose.models.Admin ?? mongoose.model('Admin', AdminSchema);
