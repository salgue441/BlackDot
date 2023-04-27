// Libraries
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Data models
const Token = require("../Models/token.model");

// Functions
/**
 * @brief
 * Generates a JWT token with the given payload.
 * @note The tokens are valid for 5 minutes
 * @param {Object} data - Payload data
 * @returns {String} JWT token string
 */
const createTokenLogin = (data) => {
  //console.log("token login creado")

  return jwt.sign(data, process.env.JWT_LOGIN, {
    expiresIn: "300s",

  })
}

/**
 * @brief
 * Generates a JWT Refresh Token with the given payload.
 * @note The tokens are valid for 8 hours.
 * @param {Object} data - Payload data
 * @returns {String} JWT Refresh Token string
 */
const createTokenRefresh = (data) => {
  data.createdAt = Date.now();
  return jwt.sign(data, process.env.JWT_REFRESH, { expiresIn: "8h" });
};

/**
 * @brief
 * Verifies the tokens and returns the payload data
 * @note The tokens are valid for 5 minutes
 * @param {String} token - JWT token string
 * @param {String} type - Token type. Default value is 'login'
 * @returns {Object} Payload data object
 */
const verifyToken = (token, type = "login") => {
  let tokenType;

  if (type === "login") tokenType = process.env.JWT_LOGIN;
  if (type === "refresh") tokenType = process.env.JWT_REFRESH;

  return jwt.verify(token, tokenType);
};

/**
 * @brief
 * Verifies the Google Token and returns the payload data
 * @param {String} token - Google Token string
 * @returns {Object} Payload data object
 */
const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload;
};

/**
 * @brief
 * Verifies if a token is blacklisted
 * @param {String} token - JWT token string
 * @return {Boolean} True if the token was blacklisted, false otherwise
 */
const isBlacklisted = async (token) => {
  const tokenExists = await Token.getByID(token);

  if (tokenExists) return true;
  return false;
};

/**
 * @brief
 * Blacklists a token
 * @param {String} token - JWT token string
 * @returns {Object} Token object
 */
const blacklistToken = async (token) => {
  const tokenModel = new Token({ id: token });
  await tokenModel.save();
};

/**
 * @brief
 * Deletes the sessions cookies and session
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Response object
 */
const deleteSession = (req, res) => {
  // SESSION
  req.session.destroy();

  // COOKIES
  res.clearCookie(this.cookie, { path: "/" });

  // Redirect
  res.status(301).redirect("/auth");
};

module.exports = {
  createTokenLogin,
  createTokenRefresh,
  verifyToken,
  verifyGoogleToken,
  isBlacklisted,
  blacklistToken,
  deleteSession,
};
