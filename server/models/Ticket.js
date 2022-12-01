import mongoose from 'mongoose';
import validator from 'validator';

export const TicketStatus = {
  Open: 'open',
  Closed: 'closed',
  Cancelled: 'cancelled',
  InProgress: 'in-progress',
};

const TicketSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please specify a date'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'cancelled', 'in-progress'],
    default: 'open',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedOn: {
    type: Date,
  },
});

TicketSchema.pre('save', function () {
  if (!this.isNew) {
    this.updatedOn = new Date();
  }
});

const Ticket = mongoose.model('Ticket', TicketSchema);
export default Ticket;
