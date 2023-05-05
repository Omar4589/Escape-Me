$(document).ready(() => {
  // Get references to page elements
  const $escapeRoom = $("#escape-room");
  const $bookingDate = $("#booking-date");
  const $bookingTime = $("#booking-time");
  const $bookingForm = $("#booking-form");

  // Handle form submission
  $bookingForm.on("submit", async (event) => {
    event.preventDefault();

    try {
      // Collect form data
      const bookingData = {
        escape_room_id: $escapeRoom.val(), // Use escapeRoomId instead of the combined value
        date: $bookingDate.val(),
        time: $bookingTime.val(),
      };

      console.log(bookingData);

      // Validate form data
      if (
        !bookingData.escape_room_id ||
        !bookingData.date ||
        !bookingData.time
      ) {
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
        throw new Error("Error creating booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
