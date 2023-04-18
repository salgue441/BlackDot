async function handleLogin(response) {
  try {
    const token = response.credential;
    const loginResponse = await fetch('/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const res = await loginResponse.json();

    // Save tokens in httpOnly cookies
    document.cookie = `blackdotToken=${res.authToken}; path=/;`;
    document.cookie = `blackdotRefreshToken=${res.refreshToken}; path=/;`;

    if (loginResponse.ok) {
      location.href = "/home";
    }
  } catch (error) {
    console.log(error);
    location.reload();
  }
}