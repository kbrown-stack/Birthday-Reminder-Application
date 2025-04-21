// This file controls the email validation.

const nodemailer = require("nodemailer");

exports.sendBirthdayEmail = async (customer) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Birthday Wishes" <${process.env.EMAIL_USER}>`,
      to: customer.email,
      subject: "🎂 Happy Birthday!",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h1 style="color: #e91e63; text-align: center;">Happy Birthday, ${customer.username}! 🎉</h1>
            <div style="text-align: center;">
              <img src="https://media.giphy.com/media/g5R9dok94mrIvplmZd/giphy.gif" alt="Birthday Cake" style="max-width: 300px;">
            </div>
            <p style="font-size: 18px; line-height: 1.6; text-align: center;">
              Wishing you a fantastic birthday filled with joy, laughter, and all your favorite things!
            </p>
            <p style="font-size: 16px; text-align: center; margin-top: 30px;">
              Best wishes,<br>
              <strong>From Brown</strong>
            </p>
          </div>
        `,
    };

    const getGreeting = (gender) => {
      switch (gender) {
        case "male":
          return "Happy Birthday, Mr. ";
        case "female":
          return "Happy Birthday, Ms. ";
        default:
          return "Happy Birthday, ";
      }
    };
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #e91e63; text-align: center;">${getGreeting(
          customer.gender
        )}${customer.username}! 🎉</h1>
        <!-- rest of the email content -->
      </div>
    `;

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Birthday email sent to ${customer.email}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`Error sending birthday email to ${customer.email}:`, err);
    throw err;
  }
};
