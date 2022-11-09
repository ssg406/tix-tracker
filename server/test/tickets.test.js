import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server.js";
import StatusCodes from "http-status-codes";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

let should = chai.should();

chai.use(chaiHttp);

/**
 * Objects to send during testing
 */
const testUser = {
  email: "testemail@gmail.com",
  password: "Compl!!!aNT**Passw000rd",
  name: "Test Name",
  role: "user",
};

const validObjectId = "6369ff8ba505b65f05ce2343";

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
    beforeEach((done) => {
      const testTicket = Ticket.create(validTicket);
      testTicket.save().then(() => done());
    });
    it("All tickets should be returned", (done) => {
      chai
        .request(app)
        .get("api/v1/tickets/all")
        .end((err, res) => {
          res.should.have.status(StatusCodes.OK);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  describe("/newTicket POST create new ticket", () => {
    it("Valid ticket should be created and returned with ID", (done) => {
      chai
        .request(app)
        .post("api/v1/tickets/new")
        .send(validTicket)
        .end((err, res) => {
          res.should.have.status(StatusCodes.CREATED);
          res.body.should.be.a("object");
          res.body.should.have.property("ticket");
          res.body.ticket.should.have.property("_id");
          res.body.ticket.should.have.property("status");
          res.body.ticket.should.have.property("createdBy");
          res.body.ticket.status.should.eql("open");
          done();
        });
    });
    it("Ticket missing date should be rejected with error message", (done) => {
      chai
        .request(app)
        .post("api/v1/tickets/new")
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
        .post("api/v1/tickets/new")
        .send(ticketNoDescription)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.body.should.be.a("object");
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
        .post("api/v1/tickets/update")
        .send({ ...validTicket, description: "New Description" })
        .end((err, res) => {
          res.should.have.status(StatusCodes.OK);
          res.body.should.be.a("object");
          res.body.should.have.property("ticket");
          res.body.ticket.should.have.property("_id");
          res.body.ticket.should.have.property("status");
          res.body.ticket.should.have.property("createdBy");
          res.body.ticket.should.have.property("description");
          res.body.ticket.description.should.eql("New Description");
          done();
        });
    });
  });

  describe("/deleteTicket DELETE deletes ticket", () => {
    beforeEach((dont) => {
      const testTicket = new Ticket(validTicket);
      testTicket.save().then(() => done());
    });
    it("Ticket should be removed if correct details given", (done) => {
      const ticket = Ticket.findOne({
        date: testTicket.date,
        description: testTicket.description,
      });
      const { _id } = ticket;
      chai
        .request(app)
        .delete("api/v1/tickets/delete")
        .send({ _id })
        .end((err, res) => {
          res.body.should.have.status(StatusCodes.OK);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("message");
          res.body.message.should.eql("Ticket deleted");
          done();
        });
    });
    it("Not found message should be sent if no ticket exists", (done) => {
      chai
        .request(app)
        .delete("api/v1/tickets/delete")
        .send({ _id: validObjectId })
        .end((err, res) => {
          res.body.should.be.a("object");
          res.status.should.be(StatusCodes.NOT_FOUND);
          res.body.should.have.property("message");
          res.body.message.should.eql("Could not find a ticket with that ID");
          done();
        });
    });
    it("Error mesage should be sent if invalid ID is given", (done) => {
      chai
        .request(app)
        .delete("api/v1/tickets/delete")
        .send("Invalid ID")
        .end((err, res) => {
          res.status.should.be(StatusCodes.BAD_REQUEST);
          res.body.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["_id"]);
          res.body.should.have.property("messages");
          res.body.messages.should.eql(
            "Field is invalid for the given request"
          );
          done();
        });
    });
  });
});
