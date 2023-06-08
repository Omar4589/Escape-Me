const escapeRoomCards = $(".escape-room");

escapeRoomCards.on("click", async (e) => {
  const escapeRoomTheme = e.currentTarget.id;
  console.log(escapeRoomTheme);
  const domain = window.location.hostname;
  const response = await fetch(
    `http://${domain}:3001/api/users/${escapeRoomTheme}`
  ); //change this to actual website URL in produciton, use template literal to insert domain variable
  const data = await response.json();
  console.log(data);
  //open a modal that displays the escape room information
  const img = $("#escape-room-image").attr("src", data.rooms[0].image_url);
  const theme = $("#theme").text(data.rooms[0].theme);
  const difficulty = $("#difficulty-level").text(data.rooms[0].difficulty);
  const duration = $("#duration").text(data.rooms[0].duration);
  const description = $("#description").text(data.rooms[0].description);
  const modal = $("#escape-room-modal").removeClass("hidden");
});

$("#closeModal").on("click", () => $("#escape-room-modal").addClass("hidden"));
