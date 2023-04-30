const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = $("#name-signup").val().trim();
  const email = $("#email-signup").val().trim();
  const password = $("#password-signup").val().trim();

  if (name && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/userhomepage");
    } else {
      alert("Something went wrong, please try again");
    }
  }
};

$("#signup-form").on("submit", signupFormHandler);
