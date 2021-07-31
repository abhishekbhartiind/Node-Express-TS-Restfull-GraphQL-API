import fs from "fs";
import path from "path";
import morgan from "morgan";
import moment from "moment";
import helmet from "helmet";
import express from "express";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";
import sequelize from "./configuration/dataBase/SqlService";
import { NoSql, store } from "./configuration/dataBase/NoSqlService";
import * as errorController from "./controllers/defaultController/error";

// call custom routes
import authRout from "./routs/authRouts/auth";
import userRout from "./routs/authRouts/userRout";
import productRout from "./routs/productRouts/productRout";

import graphqlSchema from "./GraphQL/schema";
import graphqlResolver from "./GraphQL/resolver";

//Step 1: Set the node  with express with port, key  and log
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const sessionId = process.env.session_Id || "";
// option for file upload - start
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "assets/images");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, moment().format("DD_MM_YYYY_hh_mm_ss") + "-" + file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// option for file upload - end

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

// create log for application
try {
  const PathRout = path.join(
    __dirname,
    "configuration",
    "Application_Log",
    "access.log"
  );
  let accessLogSterm: any;
  if (fs.existsSync(PathRout)) {
    accessLogSterm = fs.createWriteStream(PathRout, { flags: "a" });
  } else {
    accessLogSterm = fs.writeFileSync(
      PathRout,
      `log file create on ${new Date()}\n`
    );
  }
  app.use(morgan("combined", { stream: accessLogSterm }));
} catch (err) {
  console.error(err);
}

//Step 2: Set app middleware
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "views")));
app.use("/assets", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: sessionId,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());

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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res
    .header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    .set(
      "Content-Security-Policy",
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    );
  next();
});

//step 6: optional set grpahql
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err: any) {
      if (!err.originalError) {
        return err;
      }
    },
  })
);

//Setp 6: Set custom routs of our entier project
app.use(authRout);
app.use(userRout);
app.use(productRout);
app.get("/500", errorController.get500);
app.use(errorController.get404);
app.use((error: any, request: any, response: any) => {
  response.redirect("/500");
});

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
