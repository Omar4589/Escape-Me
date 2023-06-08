// Get the date from the DOM and format it
const preformattedDate = $("#date").text();
//Here we use dayjs() to format the date ie. 2022-05-21
let formattedDate = dayjs(preformattedDate).format("YYYY-MM-DD");

// Function to fetch bookings by date from the server
const fetchBookingsbyDate = async (date) => {
  try {
    const query = dayjs(date).format("YYYY-MM-DD");
    //Here we make a fetch request to the api URL that returns bookings by date
    const response = await fetch(
      `http://localhost:3001/api/admin/bookings/${query}`
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    
    } else {
      await $("#bookings").html("There are no bookings for this date.");
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification(
      "Something went wrong. Please contact the site administrator."
    );
  }
};

// Function to fetch bookings by theme from the server
const fetchBookingsbyTheme = async (roomid, date) => {
  try {
    const bookingdate = date;
    const ri = roomid;
    //We make a fetch request to the api url that returns bookings by id and date
    const response = await fetch(
      `http://localhost:3001/api/admin/bookings/${ri}/${bookingdate}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    showNotification(
      "Something went wrong. Please contact the site administrator."
    );
  }
};

// Function to format time from 24-hour to 12-hour format
const formatTime = (time) => {
  const parsedTime = dayjs(`2023-01-01 ${time}`);
  return parsedTime.format("hh:mm A");
};

// Function to display bookings on the page
const displayBookings = async (call) => {
  const bookings = await call;
  
  if (!bookings) {
    return;
  };

  // Clear existing bookings
  //$("#bookings").empty();
  // Loop over each booking and create and append elements to the DOM
  bookings.forEach((booking) => {
    const bookingTime = formatTime(booking.time);

    const bookingDiv = $("<div>").addClass(
      "bg-white rounded-lg shadow-lg p-5 mb-5"
    );

    // Create elements for each booking detail
    const heading = $("<h3>")
      .addClass("text-xl font-bold")
      .html(booking.escaperoom.theme);
    const time = $("<p>")
      .text("Time: ")
      .html("Time: " + bookingTime);
    const date = $("<p>")
      .text("Date: ")
      .html("Date: " + dayjs(booking.date).format("MM/DD/YYYY"));
    const name = $("<p>")
      .text("Booked By: ")
      .html("Booked By: " + booking.user.name);

    // Create buttons for edit and delete
    const options = $("<div>").addClass("flex justify-end");

    // Handle the edit button click event here
    const edit = $("<button>")
      .addClass(
        "edit-button px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
      )
      .text("✎");
    const remove = $("<button>")
      .addClass(
        "remove-button px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
      )
      .text("✕");
    //Here we append the edit and remove buttons to the options div
    options.append(edit, remove);
    //we then append the heading, time, date, name, and options elements to the bookings div
    bookingDiv.append(heading, time, date, name, options);
    $("#bookings").append(bookingDiv);

    edit.on("click", () => {
      // Handle the edit button click event here
      console.log("Edit button clicked for booking:", booking);
    });

    remove.on("click", (e) => {
      // Handle the remove button click event here
      console.log("Remove button clicked for booking:", booking);
      deleteBooking(e, booking);
    });
  });
};

// Display bookings for the formatted date
displayBookings(fetchBookingsbyDate(formattedDate));

// On left arrow click, move one day back and display bookings
$("#left-arrow").on("click", async () => {
  formattedDate = dayjs(formattedDate).subtract(1, "day");
  $("#date").text(`${formattedDate.format("MM/DD/YYYY")}`);
  await displayBookings(fetchBookingsbyDate(formattedDate));
});

// On right arrow click, move one day forward and display bookings
$("#right-arrow").on("click", async () => {
  formattedDate = dayjs(formattedDate).add(1, "day");
  $("#date").text(`${formattedDate.format("MM/DD/YYYY")}`);
  await displayBookings(fetchBookingsbyDate(formattedDate));
});

// Function to delete a booking
const deleteBooking = async (event, booking) => {
  event.preventDefault();

  const deleteId = booking.id;
  const response = await fetch(`/api/admin/bookings/${deleteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  });
  if (response.ok) {
    showNotification("Your booking has been deleted successfully.");
    displayBookings(fetchBookingsbyDate(formattedDate));
  } else {
    showNotification("Delete unsuccessful.  Please try again.");
  }
};

// Handle change event on the "rooms" dropdown
$("#rooms").on("change", async () => {
  //When the value of the rooms dropdown menu changes, we capture the value and invoke  the displayBookings function to fetch bookings by that theme
  try {
    let id = $("#rooms").val();
    //If we choose 'ALL' from the dropdown menu, we return all bookings by that date
    if (id === "All") {
      return await displayBookings(fetchBookingsbyDate(formattedDate));
    }
    //here we return the bookings by that id and date if we choose a theme from the dropdown menu
    await displayBookings(fetchBookingsbyTheme(id, formattedDate));
  } catch (err) {}
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
