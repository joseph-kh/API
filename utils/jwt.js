const { expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;

  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [`${api}/auth/login`, `${api}/auth/register`],
  });
}

module.exports = authJwt;
