import React from "react";
import { NoteInterface, useNotes } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import ColorDialog from "./ColorDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { getOrSetData } from "../utility";

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

function NoteCard({ title, description, _id, bgColor }: NoteInterface) {
  const styles = useStyles();
  const { notes, setNotes } = useNotes();

  async function handleMoveToTrash(e: React.BaseSyntheticEvent) {
    try {
      e.stopPropagation();
      const confirm = window.confirm("Move this note to the trash?");

      if (!confirm) return;

      // if the response is true
      const trashData = {
        title,
        description,
      };
      // step 1. Move data in the trash folder
      await getOrSetData("api/trash", "POST", trashData);

      // step 2. Remove selected note from the data
      await getOrSetData(`api/${_id}`, "DELETE");

      // update real-time data
      const updatedNotes = notes.filter(n => n._id !== _id);
      setNotes(updatedNotes);

      // step 3. Notify user that the trash has been deleted
      toast.success("Note has been moved to trash");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Couldn't move note to the trash.");
    }
  }

  return (
    <>
      <div
        className={styles.container}
        style={{ background: bgColor ? bgColor : "whitesmoke" }}
        id="card"
      >
        <div className={styles.topContainer}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className={styles.buttonContainer}>
            <Tooltip title="Delete" placement="top" arrow>
              <IconButton
                className={styles.deleteButton}
                onClick={handleMoveToTrash}
                id="deleteButton"
              >
                <DeleteIcon style={{ color: "#c50000" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <ColorDialog id={_id} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NoteCard;
