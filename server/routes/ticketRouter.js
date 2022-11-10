import express from "express";
import {
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
} from "../controllers/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.route("/all").get(getAllTickets);

ticketRouter.route("/new").post(createTicket);

ticketRouter.route("/update").patch(updateTicket);

ticketRouter.route("/delete").delete(deleteTicket);

export default ticketRouter;
