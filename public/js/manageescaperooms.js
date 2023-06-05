const roomDivs = $(".escape-room");

roomDivs.on("click", (e) => {
  const theme = e.target.id;
  console.log(theme);

  //make api call to fetch for escape room's info
  fetchEscapeRoomData(theme);
});

const fetchEscapeRoomData = async (theme) => {
  try {
    const roomTheme = theme;
    const response = await fetch(
      `http://localhost:3001/admin/escaperoom/${roomTheme}`
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    response.status(500).json({ message: err });
  }
};
