// Get handle on page elements
const escapeRoom = $("#escape-room");
const bookingDate = $("#booking-date");
const bookingTime = $("#booking-time");
const bookingForm = $("#booking-form");
const submitButton = $('#submit-button');

// Handle form submission
bookingForm.on("submit", async (event) => {
  event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    submitButton.attr("disabled", true);


  try {
    // Collect form data
    const bookingData = {
      escape_room_id: escapeRoom.val(),
      date: bookingDate.val(),
      time: bookingTime.val(),
    };
   // Validate form data
   if (!bookingData.escape_room_id) {
    showNotification('Please select an escape room.');
    return;
  }

  if (!bookingData.date) {
    showNotification('Please select a booking date.');
    return;
  }

  if (!bookingData.time) {
    showNotification('Please select a booking time.');
    return;
  }

    // Send a POST request with the booking data
    const response = await fetch("/api/users/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      // Redirect the user to the My Bookings page
      window.location.href = "/mybookings";
    } else {
      showNotification('Something went wrong. Please contact the site administrator.');
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification('Something went wrong. Please contact the site administrator.');
  } finally {
    // Re-enable the submit button
    submitButton.removeAttr("disabled");
  }
});

const notification = $("#notification");

// Show the notification
function showNotification(string) {
  notification.html(string);
  notification.removeClass("hidden");
  setTimeout(() => {
    notification.addClass("hidden");
  }, 3000); // Hide the notification after 3 seconds
}

