// This files helps for the documentation of the js logic for the application.

document.addEventListener("DOMContentLoaded", function () {
  // Date of birth input validation
  const dobInput = document.getElementById("dateOfBirth");
  if (dobInput) {
    // Set max date to today
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dobInput.setAttribute("max", `${year}-${month}-${day}`);

    // Add validation for form
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      const emailInput = document.getElementById("email");
      const usernameInput = document.getElementById("username");

      if (usernameInput.value.trim() === "") {
        e.preventDefault();
        alert("Please enter a username");
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        e.preventDefault();
        alert("Please enter a valid email address");
      }

      if (dobInput.value === "") {
        e.preventDefault();
        alert("Please select a date of birth");
      }
    });
  }
});
