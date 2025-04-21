const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// This helps the Load environment variables
dotenv.config();

// This Connect to database
const connectDB = require("./config/db");
connectDB();

// This imports the  routes
const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, "public"))); // helps keep all the styling.

// Set view engine
app.set("view engine", "ejs");

// Import controllers
const customerController = require("./controllers/customerController");

// Import and start cron job
const { scheduleBirthdayJob } = require("./utils/cronJob");
scheduleBirthdayJob();

// This shows the Routes
app.get("/", customerController.getCustomers);
app.get("/add", customerController.showAddForm);
app.post("/add", customerController.addCustomer);

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

// Error handling
app.use((req, res) => {
  res.status(404).render("index", { error: "Page not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
