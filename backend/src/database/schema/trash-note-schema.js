import mongoose from "mongoose";

const trashNoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const TrashNote = mongoose.model("trashNote", trashNoteSchema);
export default TrashNote;