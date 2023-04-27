// UTILS

/**
 * @brief
 * Set tokens in httpOnly cookies
 * @param {} tokens 
 * @returns blackdotToken, blackdotRefreshToken
 * @returns expires - date of expiration
 */

function setTokens(tokens) {
  const { authToken, refreshToken } = tokens;

  if (authToken) {
    document.cookie = `blackdotToken=${authToken}; expires=${new Date(  
      Date.now() + 1000 * 60 * 60 * 24 * 30
    )}; path=/;`;
  }

  if (refreshToken) {
    document.cookie = `blackdotRefreshToken=${refreshToken}; expires=${new Date(   
      Date.now() + 1000 * 60 * 60 * 24 * 30
    )}; path=/;`;
  }
}

/**
 * @brief
 * Get tokens from httpOnly cookies
 * @returns blackdotToken, blackdotRefreshToken
 */

function getTokens() {
  const cookies = document.cookie.split(";");
  const tokens = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    tokens[key.trim()] = value;
  });
  return { authToken: tokens.blackdotToken, refreshToken: tokens.blackdotRefreshToken };   
}

/**
 * @brief
 * Delete tokens from httpOnly cookies
 * @returns blackdotToken, blackdotRefreshToken
 * @returns expires - date of expiration
 * @returns path - /
 */ 

function deleteTokens() {
  // Delete cookies
  document.cookie =
    "blackdotToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
  document.cookie =
    "blackdotRefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";   
}

/**
 * @brief
 * Decode JWT token
 * @param {} token
 * @returns JSON object
 */ 

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