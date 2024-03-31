const express = require("express");
const pdf = require("html-pdf");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const advancedcert = require("./docs/advancedcert");
const simplecert = require("./docs/simplecert");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { checkForAuthentication , restrictTo } = require("./middlewares/auth");
const Cert = require("./models/cert");
const Cert1 = require("./models/cert1");
const staticRoute = require("./routes/staticRouter");
require('dotenv').config();
const userRoute = require("./routes/user");

// mongodb configuration
// try {
// connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url").then(() =>
//   console.log("Mongodb connected")
// );
// } catch (error) {
//   console.log(error);
// }

try {
  connectToMongoDB(process.env.mongo_pass).then(() =>
  console.log("Mongodb connected")
);
} catch (error) {
  console.log(error);
}

// middlewares
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use('/user',userRoute)
app.use("/certificate-maker/2", restrictTo(["NORMAL","ADMIN"]));
app.use("/", staticRoute);

// certificate layout
const options = {
  height: "520px",
  width: "670px",
  orientation: "landscape",
  border: "20px",
};

app.get('/', (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  res.render('home' , { userRole: userRole });
});

app.get("/error", (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  res.render("error" , { userRole: userRole });
});

// simple or advanced certificate route
app.get("/certificate-maker/:theme", (req, res) => {
  let userRole = req.user && req.user.role ? req.user.role : 'role';
  // console.log("theme: ", req.params.theme);
  let num = parseInt(req.params.theme);
  switch (num) {
    case 1:
      res.render("certificate-maker1", { theme: "simple" , userRole: userRole});
      break;
    case 2:
      res.render("certificate-maker", { theme: "Advanced",  userRole: userRole });
      break;

    default:
      res.render("certificate-maker1", { theme: "simple",userRole: userRole });
      break;
  }
});

// actual certificate maker route
app.post("/certificate-maker", async(req, res, next) => {
  // console.log(req.body);
  // below code to make pdf name shorter
  let userRole = req.body.userRole;
  const userName = req.body.name;
  const lowercaseName = userName.toLowerCase();
  const nospaceName = lowercaseName.replace(" ", "");
  const shortName = nospaceName.slice(0, 10);
  console.log("short name: ", shortName);
  

  let themeOptions = {
    wholeBodyColor: "",
    RightTextColor: "",
  };

  if (req.body.theme === "simple") {
    themeOptions = {
      wholeBodyColor: "rgb(183,182,255)",
      RightTextColor: "sanket",
    };

    try {
      const { name, date, title, percentage, person1 , person2 } = req.body;
      // console.log(req.body);
      if (req.user && req.user._id) {
        
        // console.log(req.user._id);
        
      const newCert = await Cert.create({
        theme:1,
        name,
        date,
        title,
        percentage,
        person1,
        person2,
        visitHistory: [],
        createdBy: req.user._id,
      });
      // console.log("New Certificate Created:", newCert);
      }
      else{
        
      const newCert = await Cert1.create({
        name,
        date,
        title,
        percentage,
        person1,
        person2,
        visitHistory: [],
        // createdBy: 0,
      });
      // console.log("New Certificate Created:", newCert);
      }

    } catch (error) {
      console.error("Error creating certificate:", error);
      return res.render("error", {
        error: "Error creating certificate",
      });
    }



    pdf
      .create(simplecert(req.body, themeOptions), options)
      .toFile(
        // __dirname + "/docs/" + shortName + "certificate.pdf",
        (error, response) => {
          if (error) throw Error("File is not created");
          res.setHeader('Content-Disposition', 'attachment; filename=' + shortName + 'certificate.pdf');
          res.sendFile(response.filename);
        }
      );

  } else if (req.body.theme === "Advanced") {

    try {
      const { name, date, title , description , userRole} = req.body;
      // console.log(req.body);

      const newCert = await Cert.create({
        theme:2,
        name,
        date,
        title,
        description,
        visitHistory: [],
        createdBy: req.user._id,
      });
      // console.log("New Certificate Created:", newCert);

    } catch (error) {
      console.error("Error creating certificate:", error);
      return res.render("error", {
        error: "Error creating certificate",
      });
    }
    pdf
      .create(advancedcert(req.body), options)
      .toFile(
        // __dirname + "/docs/" + shortName + "certificate.pdf",
        (error, response) => {
          if (error) throw Error("File is not created");
          res.setHeader('Content-Disposition', 'attachment; filename=' + shortName + 'certificate.pdf');
          res.sendFile(response.filename);
        }      
      );
  } else {
    res.render("error")
  }
});

const port = 5000;
app.listen(port, () => console.log("Server is runnig on : " + port));
