const Customer = require("../models/customer.model.js");
const Quiz = require("../models/quiz.model.js");

const bcrypt = require('bcrypt');
// Create and Save a new Customer
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(200).send({
      message: "Content can not be empty!"
    });
  }
  const { password, email } = req.body;
  Customer.findByEmail(email, async(err, data) => {
    if (!err && data?.id) {
      return  res.status(200).send({
          status: 0,
            message: "Email is existed " + email
      });
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10); 
      // Create a Customer
      const customer = new Customer({
        email: email,
        name: req.body.name,
        active: 1,
        password_hash: hashedPassword
      });
    
      // Save Customer in the database
      Customer.create(customer, (err, data) => {
        if (err)
          res.status(200).send({
            status: 0,
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else  res.status(200).send({
          status: 1,
          message: 'Registed',
          data: data
        });
      });
    }
  });
 
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAllQuiz((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findAllQuiz = (req, res) => {
  Quiz.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else {

      data.forEach(element => {
        element.answers = JSON.parse(element.answers);
      });

      res.status(200).send({
        status: 1,
        data: data
      });
    }
  });
};


exports.login =  (req, res) => {
  const { email, password } = req.body;
  Customer.findByEmail(email, async(err, data) => {
    console.log('err', err);

    if (err) {
      if (err.kind === "not_found") {

        res.status(200).send({
          status: 0,
          message: `Invalid username or password`
        });
      } else {
        res.status(200).send({
          status: 0,
          message: "Error retrieving Customer with email " + email
        });
      }
    } else {
      const passwordMatch = await bcrypt.compare(password, data.password_hash);
      if (!passwordMatch) {
        res.status(200).send({
          status: 0,
          message: `Invalid username or password`
        });
        return;
      }
      res.status(200).send(
        { message: 'Login successful', status: 1, data: data }
      );
    }
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
