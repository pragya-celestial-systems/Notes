import TrashNote from "../database/schema/trash-note-schema.js";

export async function handleGetTrashNotes(req, res) {
  try {
    const trashNotes = await TrashNote.find();
    res.status(200).send(trashNotes);
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
