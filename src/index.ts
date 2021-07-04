import fs from "fs";
import path from "path";
import https from "https";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import NoSql, { MONGODB_URI } from "./configuration/dataBase/NoSqlService";
import sequelize from "./configuration/dataBase/SqlService";
import * as errorController from "./controllers/defaultController/error";

//Step 1: Set the node  with express with port, key  and log
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const accessLogSterm = fs.createWriteStream(
  path.join(__dirname, "configuration", "Application_Log", "access.log"),
  { flags: "a" }
);

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

//Step 2: Set app middleware
app.use(helmet());
app.use(compression());
app.use(flash());
app.use(morgan("combined", { stream: accessLogSterm }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

//Setp 3: Setup DB connection
/* NoSql -> Mongo DB */
NoSql()
  .then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    console.error(error);
  });

/* Sql -> MySql */
sequelize
  .sync()
  .then((result: any) => {
    console.log("MySql connect Success!!");
  })
  .catch((error) => {
    console.log("MySql Connection Down!!");
  });

//Step 4: Set default view engine as ejs out of  (pug,ejs, express-handelbar)
app.use(express.static(path.join(__dirname, "views", "css")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/images", express.static(path.join(__dirname, "images")));

//Set 5: Set app default headers for resole cors error
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Setp 6: Set custom routs of our entier project
app.get("/500", errorController.get500);
app.use(errorController.get404);

//step 7: start the app on configure port
//--> run application by https
// https
//   .createServer({ key: privateKey, cert: certificate }, app)
//   .listen(PORT, () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
//   });
//--> run application by http
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
