const express = require("express");
const cert = require("../models/cert");
const { restrictTo } = require("../middlewares/auth");
const { handleUserLogout  } = require("../controllers/user");

const router = express.Router();

router.get('/admin/seepdf' , restrictTo(["ADMIN"]),async (req, res) => {
  // console.log(req)
  // if (!req.user) return res.redirect("/login");
  const allpdfs = await cert.find({});
  return res.render("seepdf", {
    pdfs: allpdfs,
  });
});


router.get("/", async (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});


router.get("/logout", handleUserLogout);

router.get("/user/seepdf", restrictTo(["NORMAL" , "ADMIN"]) ,async (req, res) => {
  // console.log(req)
  // if (!req.user) return res.redirect("/login");
  const allpdfs = await cert.find({ createdBy: req.user._id });
  return res.render("seepdf", {
    pdfs: allpdfs,
  });
});

router.get("/login", (req, res) => {
  return res.render("login");
});


module.exports = router;