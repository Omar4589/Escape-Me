// Get handle on page elements
const escapeRoom = $("#escape-room");
const bookingDate = $("#booking-date");
const bookingTime = $("#booking-time");
const bookingForm = $("#booking-form");
const submitButton = $("#submit-button");

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
      showNotification("Please select an escape room.");
      return;
    }

    if (!bookingData.date) {
      showNotification("Please select a booking date.");
      return;
    }

    if (!bookingData.time) {
      showNotification("Please select a booking time.");
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
      showNotification(
        "Something went wrong. Please contact the site administrator."
      );
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification(
      "Something went wrong. Please contact the site administrator."
    );
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

bookingDate.on("change", async () => {
  try {
    // Fetch business hours
    const selectedDay = dayjs(bookingDate.val()).format("dddd");

    const response = await fetch(
      `http://localhost:3001/api/users/business-hours/${selectedDay}`
    );

    const businessHours = await response.json();
    console.log(businessHours);

    // Clear the time dropdown
    bookingTime.empty();

    // Check if the business hours are set
    if (businessHours.openTime && businessHours.closeTime) {
      // Extract hours and minutes from the openTime and closeTime
      const [openHour, openMinute] = businessHours.openTime
        .split(":")
        .map(Number);
      const [closeHour, closeMinute] = businessHours.closeTime
        .split(":")
        .map(Number);

      // Loop through each hour from open to close
      for (let hour = openHour; hour <= closeHour; hour++) {
        // Loop through each minute in increments of 15 minutes within the hour
        for (let minute = 0; minute < 60; minute += 15) {
          // Skip times that are before open time on the first hour or
          // after the closing time on the last hour
          if (
            (hour === openHour && minute < openMinute) ||
            (hour === closeHour && minute >= closeMinute)
          ) {
            continue;
          }

          // Convert the current hour and minute to a 24-hour format string, e.g., '13:45'
          const timeIn24HourFormat = `${hour
            .toString()
            .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

          // Use dayjs to convert the 24-hour format time to 12-hour format with AM/PM
          // The string is prepended with a dummy date to ensure it's in a format that dayjs can parse
          const timeIn12HourFormat = dayjs(
            `2000-01-01T${timeIn24HourFormat}`
          ).format("hh:mm A");

          // Add the formatted time as an option in the bookingTime dropdown
          bookingTime.append(
            new Option(timeIn12HourFormat, timeIn12HourFormat)
          );
        }
      }
    } else {
      // If there are no business hours set for the day, add an option indicating that the business is closed
      bookingTime.append(new Option("Business is closed today", ""));
    }
  } catch (error) {
    console.error("Error fetching business hours:", error);
  }
});
