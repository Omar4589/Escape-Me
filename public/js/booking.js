$(document).ready(() => {
  // Get references to page elements
  const $escapeRoom = $("#escape-room");
  const $bookingDate = $("#booking-date");
  const $bookingTime = $("#booking-time");
  const $submitBtn = $("#submit-booking");

  // Handle form submission
  $submitBtn.on("click", async (event) => {
    event.preventDefault();

    // Collect form data
    const bookingData = {
      escapeRoom: $escapeRoom.val(),
      date: $bookingDate.val(),
      time: $bookingTime.val(),
    };

    // Validate form data
    if (!bookingData.escapeRoom || !bookingData.date || !bookingData.time) {
      return;
    }

    try {
      // Send a POST request with the booking data
      const response = await fetch("/api/bookings", {
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
