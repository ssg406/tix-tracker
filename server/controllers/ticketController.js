import Ticket, { TicketStatus } from '../models/Ticket.js';
import StatusCodes from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  AuthorizationError,
} from '../errors/index.js';

const getAllTickets = async (req, res, next) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.userId,
  };

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (search) {
    queryObject.description = { $regex: search, $options: 'i' };
  }

  let sortString;
  if (sort === 'oldest') {
    sortString = 'date';
  } else if (sort === 'newest') {
    sortString = '-date';
  }

  Ticket.find(queryObject)
    .sort(sortString)
    .exec(function (err, result) {
      if (err) {
        next(err);
      } else {
        res.status(StatusCodes.OK).json(result);
      }
    });
};

const createTicket = async (req, res, next) => {
  try {
    const newTicket = new Ticket({ ...req.body, createdBy: req.userId });
    await newTicket.save();
    res.status(StatusCodes.CREATED).json({
      ticket: {
        _id: newTicket._id,
        date: newTicket.date,
        description: newTicket.description,
        status: newTicket.status,
        createdBy: newTicket.createdBy,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    if (!ticketId) {
      throw new BadRequestError('Please provide a ticket ID');
    }
    const ticket = await getTicket(next, ticketId);
    await ticket.deleteOne();
    res.status(StatusCodes.OK).json({
      ticketId,
      message: 'Ticket deleted',
    });
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const { _id, description, status } = req.body;
    if (!_id) throw new BadRequestError('Please specify a ticket ID');
    const ticket = await getTicket(next, _id);
    if (!ticket.createdBy.equals(req.userId)) {
      throw new AuthorizationError(
        'You are not authorized to modify this ticket'
      );
    }
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;
    ticket.save();
    res.status(StatusCodes.OK).json({ ticket });
  } catch (error) {
    next(error);
  }
};

const cancelTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    if (!ticketId) {
      throw new BadRequestError('Please provide a ticket ID');
    }
    const ticket = await getTicket(next, ticketId);
    ticket.status = TicketStatus.Cancelled;
    await ticket.save();
    res.json({ ticket });
  } catch (error) {
    next(error);
  }
};

const getTicket = async (next, ticketId) => {
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError('Could not locate a ticket with that ID');
    }
    return ticket;
  } catch (error) {
    next(error);
  }
};

export {
  createTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
  cancelTicket,
};
