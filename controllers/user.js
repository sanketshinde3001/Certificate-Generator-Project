const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}


async function handleUserLogout(req, res) {
  res.clearCookie('token');
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("error", {
      error: "Invalid Username or Password",
    });

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    const token = setUser(user)
    // res.cookie("uid", sessionId);
    // res.cookie("uid", token);
    // return res.redirect("/");
    // return res.json({token});
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
};