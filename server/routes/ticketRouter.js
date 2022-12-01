import express from 'express';
import {
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  cancelTicket,
} from '../controllers/ticketController.js';

const ticketRouter = express.Router();

ticketRouter.route('/all').get(getAllTickets);

ticketRouter.route('/new').post(createTicket);

ticketRouter.route('/update').patch(updateTicket);

ticketRouter.route('/delete/:ticketId?').delete(deleteTicket);

ticketRouter.route('/cancel/:ticketId?').patch(cancelTicket);

export default ticketRouter;
