const jwt = require("jsonwebtoken");
const generateTokens = async (user,secret) => {
  //Get the token
  let token = jwt.sign(
    { data: { email: user?.email, id: user?.id ,role:user.role} },
    secret,
    { expiresIn: 60 * 60 }
  );
  let refreshToken = jwt.sign(
    { data: { email: user?.email, id: user?.id ,role:user.role} },
    secret,
    { expiresIn: "7d" }
  );
  return { token, refreshToken };
};
const generateDecodedToken = async (token,secret) => {
  const { err, decoded } = await jwt.verify(
    token,
    secret,
    function (err, decoded) {
      return { err, decoded };
    }
  )
  console.log(err,decoded)
  return {err,decoded}
};
module.exports = { generateTokens, generateDecodedToken };
