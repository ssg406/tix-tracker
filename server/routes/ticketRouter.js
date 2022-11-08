import express from "express";
import {
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.route("/all").get((req, res, next) => {
  // Get all ticekts
});

ticketRouter.route("/new").post((req, res, next) => {
  createTicket();
});

ticketRouter.route("/update").patch((req, res, next) => {
  updateTicket();
});

ticketRouter.route("/delete").delete((req, res, next) => {
  deleteTicket();
});

export default ticketRouter;
