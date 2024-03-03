module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
  const cors = require("cors");
  // Create a new Customer
  app.post("/customers", customers.create);

  app.post("/customers/login", cors({}), customers.login);

  // Retrieve all Customers
  app.get("/customers", customers.findAll);

  app.get("/customers/quiz", customers.findAllQuiz);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
};
