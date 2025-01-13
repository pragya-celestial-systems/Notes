import TrashNote from "../database/schema/trash-note-schema.js";

export async function handleGetTrashNotes(req, res) {
  try {
    const allTrashedNotes = await TrashNote.find();
    res.status(200).send(allTrashedNotes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong with the server.");
  }
}

export async function handleAddTrashNote(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send("Title and description is required");
    }

    const response = await TrashNote.create(req.body);
    res
      .status(201)
      .send({ message: "Trash note created successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong with the server.");
  }
}

export async function handleDeleteTrashNote(req, res) {
  try {
    const { noteId } = req.params;
    await TrashNote.findByIdAndDelete(noteId);
    await res.status(200).send(noteId);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong with the server.");
  }
}
