import { Router } from "express";
import {
  handleDeleteNoteById,
  handleGetNoteById,
  handleGetNotes,
  handleCreateNote,
  handleUpdateNote,
} from "../models/notes-model.js";

const router = Router();

// routes
router.route("/").get(handleGetNotes).post(handleCreateNote);
router
  .route("/:noteId")
  .get(handleGetNoteById)
  .delete(handleDeleteNoteById)
  .patch(handleUpdateNote);

export default router;
