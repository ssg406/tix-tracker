import Ticket from "../models/Ticket.js";
import StatusCodes from "http-status-codes";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";

const getAllTickets = async (req, res, next) => {
  console.log(req.userId);
  try {
    const tickets = await Ticket.find({}).populate("createdBy", "name");
    res.status(StatusCodes.OK).json(tickets);
  } catch (error) {
    next(error);
  }
};

const createTicket = async (req, res, next) => {
  try {
    const newTicket = new Ticket(req.body);
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
    const { _id } = req.body;
    if (!_id) throw new BadRequestError("Please specify a ticket ID");

    const ticket = await Ticket.findById(_id);
    if (!ticket)
      throw new NotFoundError("Could not find a ticket with that ID");
    await ticket.deleteOne();
    res.status(StatusCodes.OK).json({
      _id,
      message: "Ticket deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const { _id, description, status } = req.body;
    if (!_id) throw new BadRequestError("Please specify a ticket ID");
    const ticket = await Ticket.findById(_id);
    if (!ticket) {
      throw new NotFoundError("Could not find a ticket with that ID");
    }
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;
    ticket.save();
    res.status(StatusCodes.OK).json({ ticket });
  } catch (error) {
    next(error);
  }
};

export { createTicket, deleteTicket, updateTicket, getAllTickets };
