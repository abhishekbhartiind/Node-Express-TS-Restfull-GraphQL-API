import fs from "fs";
import path from "path";
import csurf from "csurf";
import https from "https";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import bodyParser from "body-parser";
import compression from "compression";
import session from "express-session";
import cookieParser from "cookie-parser";
import { NoSql, store } from "./configuration/dataBase/NoSqlService";
import sequelize from "./configuration/dataBase/SqlService";
import * as errorController from "./controllers/defaultController/error";

//Step 1: Set the node  with express with port, key  and log
dotenv.config();

const app = express();
const csrf = csurf();
const sessionId = process.env.session_Id || "";
const PORT = process.env.PORT || 3000;

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

const accessLogSterm = fs.createWriteStream(
  path.join(__dirname, "configuration", "Application_Log", "access.log"),
  { flags: "a" }
);

//Step 2: Set app middleware
app.use(csrf);
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));
app.use(morgan("combined", { stream: accessLogSterm }));
app.use(
  session({
    secret: sessionId,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
const io = require("socket.io")(server);
io.on("connection", (socket: any) => {
  console.log("Socket client connected");
});
