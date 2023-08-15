/**
 * @fileoverview Transaction Module - Defines the Transaction schema and model for a food delivery app.
 * @module models/transaction
 */

import mongoose from 'mongoose';

/**
 * Represents a Transaction in the database.
 * @typedef {import('mongoose').Model<Transaction & import('mongoose').Document>} TransactionModelType
 * @typedef {Object} Transaction
 * @property {string} _id - Transaction's id.
 * @property {mongoose.Schema.Types.ObjectId} customer - ObjectId referencing the Customer who made the transaction.
 * @property {number} amount - Transaction amount.
 * @property {string} paymentMethod - Payment method used (e.g., "Credit Card", "PayPal").
 * @property {string} status - Status of the transaction (e.g., "Pending", "Completed", "Failed").
 * @property {Date} createdAt - Timestamp of when the Transaction was created.
 * @property {Date} updatedAt - Timestamp of when the Transaction was last updated.
 */

/**
 * Mongoose schema for Transaction.
 * @type {mongoose.Schema}
 */
const TransactionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Transaction Model for the food delivery app's MongoDB.
 * @type {TransactionModelType}
 */
export const TransactionModel = mongoose.models.Transaction ?? mongoose.model('Transaction', TransactionSchema);
