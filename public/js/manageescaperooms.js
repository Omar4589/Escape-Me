const roomDivs = $(".escape-room");
const escapeRoomModal = $("#escape-room-modal");
const closeModal = $("#closeModal");

//When we click the x icon in the top right of the modal element, 
closeModal.on("click", () => {
  //we close the modal by adding the hidden class back to the element
  escapeRoomModal.addClass("hidden");
});

//When we click a room dive
roomDivs.on("click", (e) => {
  const theme = e.target.id;
  //make api call to fetch for escape room's info and display the modal with it's information
  displayModal(theme);
});
//Function to fetch escaperoomdata from API using escape room theme
const fetchEscapeRoomData = async (theme) => {
  try {
    const roomTheme = theme;
    const response = await fetch(
      `http://localhost:3001/api/admin/escaperoom/${roomTheme}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    res.status(500).json({ message: err });
    showNotification("Something went wrong. Please contact the site administrator.")
  }
};

//Function that displays the modal on the page
const displayModal = async (theme) => {
  //Invoke function that fetch room data
  const data = await fetchEscapeRoomData(theme);
  //remove hidden class from modal so that it's visible
  escapeRoomModal.removeClass("hidden");
  //This plugs in the data from the API call to the modal so that the user can see it 
  $("#escape-room-theme").html(data.theme);
  $("#escape-room-image").attr("src", data.image_url);
  $("#escape-room-description").html(data.description);
  $("#escape-room-difficulty").html(data.difficulty);
  $("#escape-room-duration").html(data.duration + " min");
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
