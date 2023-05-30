//handle on date element
const preformattedDate = $("#date").text();

let formattedDate = dayjs(preformattedDate).format("YYYY-MM-DD");

const fetchBookingsbyDate = async (date) => {
  try {
    const query = date;
    const response = await fetch(
      `http://localhost:3001/admin/bookings/${query}`
    );
    const data = await response.json();
    //console.log("----BOOKING DATA UNDERNEATH-----")
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// const fetchBookingsbyTheme = async (roomid) => {
//   try {
//     console.log(roomid);
//     const ri = roomid;
//     console.log(ri);
//     const response = await fetch(
//       `http://localhost:3001/admin/bookings/${ri}`
//     );
//     console.log(response);

//     const data = await response.json();
//     console.log("----BOOKING DATA UNDERNEATH-----");
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const formatTime = (time) => {
  const parsedTime = dayjs(`2023-01-01 ${time}`);
  return parsedTime.format("hh:mm A");
};

const displayBookings = async (call) => {
  const bookings = await call;

  $("#bookings").empty();
  bookings.forEach((booking) => {
    const bookingTime = formatTime(booking.time);

    const bookingDiv = $("<div>").addClass(
      "bg-white rounded-lg shadow-lg p-5 mb-5"
    );

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

    const options = $("<div>").addClass("flex justify-end");

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

    options.append(edit, remove);
    bookingDiv.append(heading, time, date, name, options);
    $("#bookings").append(bookingDiv);

    // Add event listener to the edit button
    edit.on("click", () => {
      // Handle the edit button click event here
      console.log("Edit button clicked for booking:", booking);
      // Perform any desired actions or call a function to handle the edit operation
    });

    // Add event listener to the edit button
    remove.on("click", (e) => {
      // Handle the edit button click event here
      console.log("Remove button clicked for booking:", booking);
      deleteBooking(e, booking);
      // Perform any desired actions or call a function to handle the edit operation
    });
  });
};

displayBookings(fetchBookingsbyDate(formattedDate));

$("#left-arrow").on("click", async () => {
  console.log("you clicked the left arrow");
  formattedDate = dayjs(formattedDate).subtract(1, "day"); // Subtract one day using dayjs

  $("#date").text(`${formattedDate.format("MM/DD/YYYY")}`);
  await displayBookings(fetchBookingsbyDate(formattedDate));
});

$("#right-arrow").on("click", async () => {
  console.log("you clicked the left arrow");
  formattedDate = dayjs(formattedDate).add(1, "day"); // Add one day using dayjs
  $("#date").text(`${formattedDate.format("MM/DD/YYYY")}`);
  await displayBookings(fetchBookingsbyDate(formattedDate));
});

const deleteBooking = async (event, booking) => {
  event.preventDefault();

  const deleteId = booking.id;
  console.log(deleteId);

  const response = await fetch(`/admin/bookings/${deleteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin", // Include this line to ensure that the session cookie is sent with the request
  });
  if (response.ok) {
    alert("Your booking has been deleted successfully.");
    displayBookings(fetchBookingsbyDate(formattedDate));
  } else {
    alert("Delete unsuccessful.  Please try again.");
  }
};

// $("#rooms").on("change", async () => {
//   let id = $("#rooms").val();
//   console.log(id);
//   await displayBookings(fetchBookingsbyTheme(id));
// });
