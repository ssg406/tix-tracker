import express from "express";
import {
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.route("/tickets").get((req, res, next) => {
  // Get all ticekts
});

ticketRouter.route("/newTicket").post((req, res, next) => {
  createTicket();
});

ticketRouter.route("/updateTicket").patch((req, res, next) => {
  updateTicket();
});

ticketRouter.route("/deleteTicket").delete((req, res, next) => {
  deleteTicket();
});

export default ticketRouter;
