const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = $("#email-login").val();
  const password = $("#password-login").val();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to log in");
    }
  }
};

$("#login-form").on("submit", loginFormHandler);
