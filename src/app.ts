import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
dotenv.config();

const app = express();
const port = process.env.port || 4000;
import db from "./domain/models/index";
import { expressRateLimiter } from "./middleware/rateLimit";

//route
import UserRoutes from "./api/user/Route";

// Morgan Middleware for logging
app.use(morgan("dev"));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

// Security helmet
app.use(
  helmet({
    frameguard: false,
  }),
);

app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
    origin: "*",
  }),
);

app.set("trust proxy", 2);

//rate limiter using express-rate-limit
app.use(expressRateLimiter);

app.get("/", (_, res) => {
  res.send("sever running...");
});

app.use("/api/v1/user", UserRoutes);

// invalid route
app.get("*", (_, res) => {
  res.status(404).send("Invalid Endpoint");
});

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
  process.exit(1);
});

// db
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(`
      
        ${process.env.NODE_ENV} database running... on ${process.env.dbHost}
      
      `);

    app.listen(port, () => {
      console.log(`
        
        Server is running on http://localhost:${port}
      
      `);
    });
  })
  .catch((err: any) => console.log(err));
