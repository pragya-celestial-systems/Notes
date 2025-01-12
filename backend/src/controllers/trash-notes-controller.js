import Router from "express";
import { handleAddTrashNote, handleGetTrashNotes } from "../models/trash-notes-model.js";

const router = Router(); 

// routes
router.route("/").get(handleGetTrashNotes).post(handleAddTrashNote)

export default router;