import Note from "../database/schema/note-schema.js";

export async function handleGetNotes(req, res) {
  try {
    const allNotes = await Note.find();
    res.status(200).send(allNotes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong. Couldn't fetch data");
  }
}

export async function handleCreateNote(req, res) {
  try {
    const { title, description } = req.body;
    const newNote = {
      title,
      description,
    };

    const data = await Note.create(newNote);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong. Couldn't create note" );
  }
}

export async function handleGetNoteById(req, res) {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong. Couldn't fetch data" );
  }
}

export async function handleDeleteNoteById(req, res) {
  try {
    const { noteId } = req.params;
    const response = await Note.findByIdAndDelete(noteId);

    if (!response) {
      return res.status(404).send("Coundn't find data to delete");
    }

    return res
      .status(204)
      .send("Data deleted successfully");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong. Couldn't delete data");
  }
}

export async function handleUpdateNote(req, res) {
  try {
    const data = req.body;
    const { noteId } = req.params;

    if (!noteId) {
      return res
        .status(400)
        .send("Id is required to update the data" );
    }

    if (!data) {
      return res.status(400).send("Couldn't find data to update");
    }

    const response = await Note.findByIdAndUpdate(noteId, data);
    res.status(200).send({ message: "Data updated successfully", response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something went wrong. Couldn't update data");
  }
}
