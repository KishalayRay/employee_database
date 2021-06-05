const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const PORT = process.env.PORT || 5000;
const employeeRoutes = require("./routes/employees");
const connectDB = require("./database/connection");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use((req,res,next) => {
    res.locals.success_msg=req.flash(('success_msg'));
    res.locals.error_msg=req.flash(('error_msg'));
    next();
})
app.use(employeeRoutes);
connectDB();
app.listen(PORT, () => {
  console.log(`listning from the port no ${PORT}`);
});
