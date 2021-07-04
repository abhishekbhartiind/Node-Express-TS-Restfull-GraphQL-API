import fs from "fs";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import NoSql from "./configuration/dataBase/NoSqlService";
import sequelize from "./configuration/dataBase/SqlService";

//Step 1: Set the node  with express with port and log
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const accessLogSterm = fs.createWriteStream(
  path.join(__dirname, "configuration", "Application_Log", "access.log"),
  { flags: "a" }
);

//Step 2: Set app middleware
app.use(helmet());
app.use(compression());
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
app.set("view engine", "ejs");
app.set("views", "views");

//Set 5: Set app default headers for resole cors error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Setp 6: Set custom routs of our entier project

app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "views", "404Pages", "404.html"));
});

//step 7: start the app on configure port
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
