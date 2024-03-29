const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  total: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceDetail' }],
})

const collectionName = 'Invoice'
module.exports = mongoose.model(collectionName, InvoiceSchema, collectionName);
