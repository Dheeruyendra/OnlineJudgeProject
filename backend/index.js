import express from "express";
import DBConnection from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./router/routes.js";

const app = express();
const port = 8000 || process.env.PORT; 
DBConnection();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", router);

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
