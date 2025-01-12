import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectToMongodb from "./src/database/mongdb-config.js";
import notesController from "./src/controllers/notes-controller.js";
config();

const app = express();

// middlewares
app.use(cors({
  origin: "*",
}));

app.use(express.json());
app.use("/api", notesController);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // connect to the databse (MongoDB atlas)
  connectToMongodb();
  // eslint-disable-next-line no-undef
  console.log(`Server is running on port ${process.env.PORT}`);
});
