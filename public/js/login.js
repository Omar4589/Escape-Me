//Function that handles the login form
const loginFormHandler = async (event) => {
  //we use event.preventDefault to prevent the page from reloading after eventlistener fires
  event.preventDefault();
//We capture the values of the email and password fields
  const email = $("#email-login").val();
  const password = $("#password-login").val();
//Validate the email and password input fields
//If they are valid, (if they exist)
  if (email && password) {
    //Make a fetch request to api url 
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //this essentially does a request to /home url
      document.location.replace("/home");
    } else {
      showNotification("Wrong email or password. Try again.")
    }
  }
};
//This is the event listener for the login form, the loginFOrmHandler function is invoked at submission
$("#login-form").on("submit", loginFormHandler);

const notification = $("#notification");

// Show the notification
function showNotification(string) {
  notification.html(string);
  notification.removeClass("hidden");
  setTimeout(() => {
    notification.addClass("hidden");
  }, 3000); // Hide the notification after 3 seconds
};