//Function that handles user logout
const logout = async () => {
  //Here we make a fetch request to an api url that logs the user out
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    //We make a request to the root path of our site which redirects the user to the welcome page 
    document.location.replace("/");
  } else {
    showNotification(response.statusText);
  }
};
//This is the event listener that listens for a click on the logout button
$("#logout").on("click", logout);

const logOutNotification = $("#notification");

// Show the notification
function showNotification(string) {
  logOutNotification.html(string);
  logOutNotification.removeClass("hidden");
  setTimeout(() => {
    logOutNotification.addClass("hidden");
  }, 3000); // Hide the notification after 3 seconds
};