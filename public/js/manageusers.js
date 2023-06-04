const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3001/admin/users");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const displayUsers = async (fetchUsers) => {
  const users = await fetchUsers();

  $("#users-list").empty();
  users.forEach((user) => {
    const userRow = $("<tr>");

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

    // Add event listener to the edit button
    updateBtn.on("click", () => {
      // Handle the edit button click event here
      console.log("Edit button clicked for user:", user.name);
    });

    // Add event listener to the edit button
    DeleteBtn.on("click", () => {
      // Handle the edit button click event here
      console.log("Delete button clicked for user:", user);
      deleteUser(user.id);
    });
  });
};

displayUsers(fetchUsers);

const deleteUser = async (userId) => {
  const deleteId = userId;
  console.log(deleteId);

  const response = await fetch(`/admin/users/${deleteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin", // Include this line to ensure that the session cookie is sent with the request
  });
  if (response.ok) {
    alert("User has been deleted successfully.");
    displayUsers(fetchUsers);
  } else {
    alert("Delete unsuccessful.  Please try again.");
  }
};

const formatDate = (date) => {
  return dayjs(date).format("MM/DD/YYYY");
};
