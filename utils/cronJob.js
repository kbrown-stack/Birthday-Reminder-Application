const cron = require("node-cron");
const Customer = require("../models/Customer");
const { sendBirthdayEmail } = require("../controllers/emailController");

// Function to check for birthdays and send emails
const checkBirthdays = async () => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1; // JavaScript months are 0-indexed
    const day = today.getDate();

    // Find customers whose birthday is today (regardless of year)
    const customers = await Customer.find();

    // Filter customers who have birthday today
    const birthdayCustomers = customers.filter((customer) => {
      const dob = new Date(customer.dateOfBirth);
      return dob.getMonth() + 1 === month && dob.getDate() === day;
    });

    console.log(`Found ${birthdayCustomers.length} birthdays for today.`);

    // Send emails to each customer
    for (const customer of birthdayCustomers) {
      await sendBirthdayEmail(customer);
    }
  } catch (err) {
    console.error("Error in birthday cron job:", err);
  }
};

// Schedule the cron job to run at 7:00 AM every day
// Cron format: minute hour day-of-month month day-of-week
const scheduleBirthdayJob = () => {
  cron.schedule("0 7 * * *", () => {
    console.log("Running birthday check cron job...");
    checkBirthdays();
  });

  console.log("Birthday cron job scheduled to run at 7:00 AM daily");
};

module.exports = { scheduleBirthdayJob, checkBirthdays };
