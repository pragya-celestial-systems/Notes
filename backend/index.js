import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectToMongodb from "./src/config/mongdb-config.js";
import notesRouter from "./src/routers/notes-router.js";
import trashRouter from "./src/routers/trash-notes-router.js";
config();

const app = express();

// middlewares
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/trash", trashRouter);
app.use("/api", notesRouter);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // connect to the databse (MongoDB atlas)
  connectToMongodb();
  // eslint-disable-next-line no-undef
  console.log(`Server is running on port ${process.env.PORT}`);
});
