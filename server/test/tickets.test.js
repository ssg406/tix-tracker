import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server.js";
import StatusCodes from "http-status-codes";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

let should = chai.should();

chai.use(chaiHttp);

const validTicket = {
  date: new Date(),
  description: "A description of a ticket",
};
const ticketNoDate = {
  description: "Only a description",
};
const ticketNoDescription = {
  date: new Date(),
};

describe("Ticket Routes at /api/v1/tickets", () => {
  beforeEach((done) => {
    Ticket.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/tickets GET all tickets", () => {
    it("All tickets should be returned", (done) => {
      chai
        .request(app)
        .get("/all")
        .end((err, res) => {
          res.should.have.status(StatusCodes.OK);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/newTicket POST create new ticket", () => {
    it("Valid ticket should be created and returned with ID", (done) => {
      chai
        .request(app)
        .post("/new")
        .send(validTicket)
        .end((err, res) => {
          res.should.have.status(StatusCodes.CREATED);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("status");
          res.body.should.have.property("user");
          res.body.status.should.eql("open");
          done();
        });
    });
    it("Ticket missing date should be rejected with error message", (done) => {
      chai
        .request(app)
        .post("/new")
        .send(ticketNoDate)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.body.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["date"]);
          done();
        });
    });
    it("Ticket missing description should be rejected with error message", (done) => {
      chai
        .request(app)
        .post("/new")
        .send(ticketNoDescription)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.body.should.be("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["description"]);
          done();
        });
    });
  });
  describe("/updateTicket PATCH modify ticket", () => {
    it("Updated ticket should be accepted and details returned", (done) => {
      chai
        .request(app)
        .post("/update")
        .send({})
        .end((err, res) => {
          // test body
        });
    });
    it("");
  });
  describe("/deleteTicket DELETE deletes ticket", () => {
    it("Ticket should be removed if correct details given", (done) => {});
  });
});
