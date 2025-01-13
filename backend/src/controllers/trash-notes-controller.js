import { Router } from "express";
import { handleAddTrashNote, handleGetTrashNotes } from "../models/trash-notes-model.js";

const router = Router(); 

// routes
router.get("/",handleGetTrashNotes);
router.route("/").post(handleAddTrashNote);

export default router;