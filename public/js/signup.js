// Function to handle user registration form submission
const signupFormHandler = async (event) => {
  // Prevents the default action of form submission
  event.preventDefault();

  // Gather input fields values and trim unnecessary spaces
  const name = $("#name-signup").val().trim();
  const email = $("#email-signup").val().trim();
  const password = $("#password-signup").val().trim();
  const confirmpassword = $("#confirmpassword-signup").val().trim();

  // Check if all the fields have been filled and the passwords match
  if (name && email && password && confirmpassword) {
    if (password !== confirmpassword) {
      showNotification("Passwords don't match. Try again.");
    } else {
      // Send the form data to the server to create a new user
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      // If the registration is successful, redirect the user to the home page
      if (response.ok) {
        document.location.replace("/home");
      } else {
        showNotification("Something went wrong, please try again");
      }
    }
  } else {
    showNotification("Something went wrong, please try again");
  }
};

// Event listener to handle the form submission
$("#signup-form").on("submit", signupFormHandler);

const notification = $("#notification");

// Show the notification
function showNotification(string) {
  notification.html(string);
  notification.removeClass("hidden");
  setTimeout(() => {
    notification.addClass("hidden");
  }, 3000); // Hide the notification after 3 seconds
};