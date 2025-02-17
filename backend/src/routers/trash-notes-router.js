import { Router } from "express";
import { handleAddTrashNote, handleDeleteTrashNote, handleGetTrashNotes } from "../controllers/trash-notes-controller.js";

const router = Router(); 

// routes
router.route("/").get(handleGetTrashNotes).post(handleAddTrashNote);
router.route("/:noteId").delete(handleDeleteTrashNote);

export default router;