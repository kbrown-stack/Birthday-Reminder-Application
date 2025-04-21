const Customer = require("../models/Customer");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ username: 1 });
    res.render("index", {
      customers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.showAddForm = (req, res) => {
  res.render("add-customer");
};

// Adding new customer

exports.addCustomer = async (req, res) => {
  try {
    const { username, email, gender, dateOfBirth } = req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).render("add-customer", {
        error: "Customer with this email already exists",
        username,
        email,
        gender,
        dateOfBirth,
      });
    }

    await Customer.create({
      username,
      email,
      gender,
      dateOfBirth: new Date(dateOfBirth),
    });

    res.render("success", {
      message: "Customer added successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
