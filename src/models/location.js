/**
 * @fileoverview Address Data Module - Defines the Address Data schema and model.
 * @module models/AddressData
 */

import mongoose from 'mongoose';

/**
 * Represents Address Data in the database.
 * @typedef {import('mongoose').Model<AddressData & import('mongoose').Document>} AddressDataModelType
 * @typedef {Object} AddressData
 * @property {string} _id - Address Data's id.
 * @property {string} name - Name in the Address data.
 * @property {string} mobile - Mobile in the Address data.
 * @property {string} email - Email in the Address data.
 * @property {string} city - City in the Address data.
 * @property {string} zipcode - Zipcode in the Address data.
 * @property {string} state - State in the Address data.
 * @property {string} address - Address in the Address data.
 * @property {Date} createdAt - Timestamp of when the Address Data was created.
 * @property {Date} updatedAt - Timestamp of when the Address Data was last updated.
 */

/**
 * Mongoose schema for Address Data.
 * @type {mongoose.Schema}
 */
const AddressDataSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        },
        state: {
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
 * Address Data Model.
 * @type {AddressDataModelType}
 */
export const AddressDataModel = mongoose.models.AddressData ?? mongoose.model('AddressData', AddressDataSchema);
