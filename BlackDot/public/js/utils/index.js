// UTILS
function setTokens(tokens) {
  const { authToken, refreshToken } = tokens;

  if (authToken) {
    document.cookie = `blackdotToken=${authToken}; expires=${new Date(  ///NEED to change 
      Date.now() + 1000 * 60 * 60 * 24 * 30
    )}; path=/;`;
  }

  if (refreshToken) {
    document.cookie = `blackdotRefreshToken=${refreshToken}; expires=${new Date(   ///NEED to change 
      Date.now() + 1000 * 60 * 60 * 24 * 30
    )}; path=/;`;
  }
}

function getTokens() {
  const cookies = document.cookie.split(";");
  const tokens = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    tokens[key.trim()] = value;
  });
  return { authToken: tokens.blackdotToken, refreshToken: tokens.blackdotRefreshToken };   ///NEED to change 
}

function deleteTokens() {
  // Delete cookies
  document.cookie =
    "blackdotToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";   ///NEED to change 
  document.cookie =
    "blackdotRefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";   ///NEED to change 
}

function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}