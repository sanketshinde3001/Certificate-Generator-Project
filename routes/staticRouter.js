const express = require("express");
const cert = require("../models/cert");
const cert1 = require("../models/cert1");
const { restrictTo } = require("../middlewares/auth");
const { handleUserLogout  } = require("../controllers/user");

const router = express.Router();

router.get('/admin/seepdf' , restrictTo(["ADMIN"]),async (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  // console.log(req)
  // if (!req.user) return res.redirect("/login");
  const allpdfs = await cert.find({});
  const allpdfs1 = await cert1.find({});
  let combinedData = [...allpdfs, ...allpdfs1];

  combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.render("seepdf", {
    pdfs: combinedData,
    userRole: userRole,
  });
});


// router.get("/", async (req, res) => {
//   return res.render("home", { user: req.user.role });
// });

router.get('/',async function(req, res) {
  let userRole = req.user && req.user.role ? req.user.role : 'role'; // Set a default role if 'req.user' or 'req.user.role' is not available

  res.render('home', { userRole: userRole });
});

router.get("/signup", (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  return res.render("signup", { userRole: userRole });
});


router.get("/logout", handleUserLogout);

router.get("/user/seepdf", restrictTo(["NORMAL" , "ADMIN"]) ,async (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  // console.log(req)
  // if (!req.user) return res.redirect("/login");
  const data = await cert.find({ createdBy: req.user._id });
  data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // console.log(allpdfs)
  return res.render("seepdf", {
    pdfs: data,
    userRole: userRole,
  });
});


router.get("/login", (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  return res.render("login", { userRole: userRole });
});


module.exports = router;