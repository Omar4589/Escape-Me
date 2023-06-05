const roomDivs = $(".escape-room");
const escapeRoomModal = $("#escape-room-modal");
const closeModal = $("#closeModal");

closeModal.on("click", () => {
  escapeRoomModal.addClass("hidden");
});

roomDivs.on("click", (e) => {
  const theme = e.target.id;
  //make api call to fetch for escape room's info
  displayModal(theme);
});

const fetchEscapeRoomData = async (theme) => {
  try {
    const roomTheme = theme;
    const response = await fetch(
      `http://localhost:3001/admin/escaperoom/${roomTheme}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const displayModal = async (theme) => {
  const data = await fetchEscapeRoomData(theme);
  escapeRoomModal.removeClass("hidden");
  $("#escape-room-theme").html(data.theme);
  $("#escape-room-image").attr("src", data.image_url);
  $("#escape-room-description").html(data.description);
  $("#escape-room-difficulty").html(data.difficulty);
  $("#escape-room-duration").html(data.duration + " min");
};
