import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

/**
 * Test User Data
 */
const testUserData = [
  {
    email: "apaxton0@issuu.com",
    name: "Aldridge Paxton",
    password: "dlq75Ulg17",
  },
  {
    email: "npickthorn1@nbcnews.com",
    name: "Nessa Pickthorn",
    password: "KSZhOl",
  },
  {
    email: "aorbine2@va.gov",
    name: "Angel Orbine",
    password: "qx27GJY",
  },
  {
    email: "frayer3@dot.gov",
    name: "Freedman Rayer",
    password: "lfa35yYZiY",
  },
  {
    email: "ccritcher4@geocities.jp",
    name: "Chico Critcher",
    password: "fdVlXm5K",
  },
];

const testTicketData = [
  /**
   * Test Ticket Data
   */
  ({
    date: "2022/09/17",
    description: "tempus vel pede morbi porttitor",
    createdBy: "636b571dfc13ae3f12000bf0",
  },
  {
    date: "2022/11/28",
    description: "mauris lacinia sapien quis libero",
    createdBy: "636b571dfc13ae3f12000bf1",
  },
  {
    date: "2022/09/14",
    description: "ornare imperdiet sapien urna pretium",
    createdBy: "636b571dfc13ae3f12000bf2",
  },
  {
    date: "2022/09/23",
    description: "neque sapien placerat ante nulla",
    createdBy: "636b571dfc13ae3f12000bf3",
  },
  {
    date: "2022/01/20",
    description: "orci eget orci vehicula condimentum",
    createdBy: "636b571dfc13ae3f12000bf4",
  },
  {
    date: "2022/02/24",
    description: "vestibulum sed magna at nunc commodo",
    createdBy: "636b571dfc13ae3f12000bf5",
  },
  {
    date: "2022/01/15",
    description: "nec euismod scelerisque quam turpis adipiscing",
    createdBy: "636b571dfc13ae3f12000bf6",
  },
  {
    date: "2022/07/11",
    description: "non quam nec dui luctus rutrum nulla tellus",
    createdBy: "636b571dfc13ae3f12000bf7",
  },
  {
    date: "2022/04/22",
    description: "nisi nam ultrices libero non mattis pulvinar nulla",
    createdBy: "636b571dfc13ae3f12000bf8",
  },
  {
    date: "2022/09/23",
    description: "lorem ipsum dolor sit amet consectetuer",
    createdBy: "636b571dfc13ae3f12000bf9",
  }),
];

const populateUserData = () => {
  User.create(testUserData, function (err) {
    if (err) throw new Error("Could not save test data");
  });
};

const populateTicketData = () => {
  Ticket.create(testTicketData, function (err) {
    if (err) throw new Error("Could not save test ticket data");
  });
};

export { populateTicketData, populateUserData };
