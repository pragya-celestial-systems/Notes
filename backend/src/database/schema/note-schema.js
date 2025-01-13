import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  bgColor: {
    type: String,
    default: "whitesmoke",
  },
});

const Note = mongoose.model("note", noteSchema);
export default Note;
