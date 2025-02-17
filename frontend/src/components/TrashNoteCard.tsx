import React from "react";
import { NoteInterface, useNotes } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import { toast, ToastContainer } from "react-toastify";
import { getOrSetData } from "../utility";
import CardMenu from "./Menu";

const useStyles = makeStyles({
  container: {
    padding: "1rem",
    borderRadius: "5px",
    margin: "1rem",
    height: "200px",
    width: "500px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    "&:hover": {
      transition: "0.3s",
      transform: "scale(1.02)",
      boxShadow: "0 5px 15px lightgrey",
    },
  },
  topContainer: {
    height: "70%",
    overflow: "scroll",
    display: "flex",
    justifyContent: "space-between",
  },
  bottomContainer: {
    height: "20%",
    overflow: "hidden",
  },
  content: {
    width: "80%",
  },
  buttonContainer: {
    width: "15%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  deleteButton: {
    height: "center",
    width: "center",
  },
});

function TrashNoteCard({ title, description, _id, bgColor = "whitesmoke" }: NoteInterface) {
  const styles = useStyles();
  const { trashNotes, setTrashNotes } = useNotes();

  async function handleRestoreNote() {
    try {
      const confirm = window.confirm("Do you want to restore this note? This will move the note in the 'All Notes' folder");

      if (!confirm) return;

      // if the response is true
      const trashData = {
        title,
        description,
        bgColor,
      };
      // step 1. Move data in the trash folder
      await getOrSetData("api", "POST", trashData);

      // step 2. Remove selected note from the data
      await getOrSetData(`api/trash/${_id}`, "DELETE");

      // update real-time data
      const updatedTrash = trashNotes.filter(trash => trash._id !== _id);
      setTrashNotes(updatedTrash);

      // step 3. Notify user that the trash has been deleted
      toast.warn("Note has been moved to the 'All Notes' folder");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Couldn't move note to the trash.");
    }
  }

  async function handleDeleteForever() {
    try {
      const confirm = window.confirm("Are you sure you want to delete this note? This action can't be undone.");

      if(!confirm) return;

      await getOrSetData(`api/trash/${_id}`, "DELETE");
      const updatedTrash = trashNotes.filter(trash => trash._id !== _id);
      setTrashNotes(updatedTrash);

      // display message
      toast.success("Trash delete successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const dummyObj = {
    title: "",
    description: "",
    _id: "",
    bgColor: "",
  };

  console.log(bgColor);

  return (
    <>
      <div
        className={styles.container}
        style={{ background: bgColor }}
        id="card"
      >
        <div className={styles.topContainer}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className={styles.buttonContainer}>
            <CardMenu onDelete={handleDeleteForever} onRestore={handleRestoreNote} isTrashFolder={true} noteData={dummyObj}/>
          </div>
        </div>
      </div>
      <ToastContainer closeOnClick={true}/>
    </>
  );
}

export default TrashNoteCard;