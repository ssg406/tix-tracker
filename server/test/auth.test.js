import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server.js";
import StatusCodes from "http-status-codes";
import User from "../models/User.js";

let should = chai.should();

const completeUser = {
  email: "testemail@gmail.com",
  password: "Compl!!!aNT**Passw000rd",
  name: "Test Name",
  role: "user",
};

const loginValid = {
  email: "testemail@gmail.com",
  password: "Compl!!!aNT**Passw000rd",
};

const loginInvalidEmail = {
  email: "test@test.com",
  password: "Password",
};

const loginInvalidPassword = {
  email: "testemail@gmail.com",
  password: "invalidPassword",
};

const userInvalidPassword = {
  email: "testemail@gmail.com",
  password: "nodigits",
  name: "Test Name",
  role: "user",
};

const userNoEmail = {
  password: "Compl!!!aNT**Passw000rd",
  name: "Test Name",
  role: "user",
};

const userNoPassword = {
  email: "testemail@gmail.com",
  name: "Test Name",
  role: "user",
};

const userNoName = {
  email: "testemail@gmail.com",
  password: "Compl!!!aNT**Passw000rd",
  role: "user",
};

chai.use(chaiHttp);
describe("Authorization Routes", () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/register new user (POST)", () => {
    it("A new user should be created", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(completeUser)
        .end((err, res) => {
          res.should.have.status(StatusCodes.CREATED);
          res.body.should.be.a("object");
          res.body.should.have.property("user");
          res.body.user.should.have.property("email").eql(completeUser.email);
          done();
        });
    });
    it("It should send error response with email field missing", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(userNoEmail)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.body.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["email"]);
          done();
        });
    });
    it("It should send error response with password missing", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(userNoPassword)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.body.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["password"]);
          done();
        });
    });
    it("It should send error response with name missing", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(userNoName)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["name"]);
          done();
        });
    });
    it("It should not allow duplicate emails to be registered", (done) => {
      User.create(completeUser);
      chai
        .request(app)
        .post("/register")
        .send(completeUser)
        .end((err, res) => {
          res.should.have.status(StatusCodes.CONFLICT);
          res.body.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["email"]);
          done();
        });
    });
    it("Password restrictions should be enforced", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(userInvalidPassword)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          res.body.should.be.a("object");
          res.body.should.have.property("fields");
          res.body.fields.should.eql(["password"]);
          done();
        });
    });
  });
  describe("/login existing user (POST)", () => {
    beforeEach((done) => {
      const testUser = new User(completeUser);
      testUser.save().then(() => done());
    });
    it("Successful login should return JWT", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(loginValid)
        .end((err, res) => {
          res.should.have.status(StatusCodes.OK);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          res.body.should.have.property("user");
          res.body.user.should.have.property("email");
          res.body.user.email.should.eql(loginValid.email);
          done();
        });
    });
    it("Invalid password should return 401 and error message", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(loginInvalidPassword)
        .end((err, res) => {
          res.should.have.status(StatusCodes.UNAUTHORIZED);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.eql("Invalid user details");
          done();
        });
    });
    it("Invalid email should return 404 and error message", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(loginInvalidEmail)
        .end((err, res) => {
          res.should.have.status(StatusCodes.NOT_FOUND);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.eql("User not found");
          done();
        });
    });
  });
});
