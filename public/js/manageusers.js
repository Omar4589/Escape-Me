// Function to fetch all users data from the server
const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/admin/users");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    showNotification(
      "Something went wrong. Please contact the site administrator."
    );
  }
};

// Function to display the fetched users data on the page
const displayUsers = async (fetchUsers) => {
  try {
    const users = await fetchUsers();

    // Clear the previous content of the users list
    $("#users-list").empty();
    users.forEach((user) => {
      // Create a new row for each user
      const userRow = $("<tr>");

      // Fill the row with user data
      const name = $("<td>").addClass("px-6 py-4").html(user.name);
      const email = $("<td>").addClass("px-6 py-4").html(user.email);

      const dateCreated = $("<td>")
        .addClass("px-6 py-4")
        .html(formatDate(user.created_at));

      const lastUpdated = $("<td>")
        .addClass("px-6 py-4")
        .html(formatDate(user.updated_at));

      const options = $("<td>").addClass(
        "flex justify-center items-center px-6 py-4"
      );

      // Create buttons for updating and deleting the user
      const updateBtn = $("<button>")
        .addClass(
          "update-button mx-6 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
        )
        .text("✎");

      const DeleteBtn = $("<button>")
        .addClass(
          "delete-button mx-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-green-700 mr-2"
        )
        .text("✕");

      options.append(updateBtn, DeleteBtn);
      userRow.append(name, email, dateCreated, lastUpdated, options);
      $("#users-list").append(userRow);

      // Add event listeners to handle clicking the buttons
      updateBtn.on("click", () => {
        // Action when edit button is clicked
        console.log("Edit button clicked for user:", user.name);
      });

      DeleteBtn.on("click", () => {
        // Action when delete button is clicked
        console.log("Delete button clicked for user:", user);
        deleteUser(user.id);
      });
    });
  } catch (err) {
    console.log(err);
    showNotification(
      "Something went wrong. Please contact the site administrator."
    );
  }
};

// Call function to display the list of users
displayUsers(fetchUsers);

// Function to send a delete request to the server
const deleteUser = async (userId) => {
  try {
    const deleteId = userId;

    const response = await fetch(`/api/admin/users/${deleteId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin", // Include this line to ensure that the session cookie is sent with the request
    });
    if (response.ok) {
      // Alert upon successful deletion and update the users list
      showNotification("User deleted successfully.");

      displayUsers(fetchUsers);
    } else {
      alert("Delete unsuccessful.  Please try again.");
      showNotification("Delete unsuccessful.  Please try again.");
    }
  } catch (err) {
    console.log(err);
    showNotification(
      "Something went wrong. Please contact the site administrator."
    );
  }
};

// Function to format dates
const formatDate = (date) => {
  return dayjs(date).format("MM/DD/YYYY");
};

const notification = $("#notification");

// Show the notification
function showNotification(string) {
  notification.html(string);
  notification.removeClass("hidden");
  setTimeout(() => {
    notification.addClass("hidden");
  }, 3000); // Hide the notification after 3 seconds
}
