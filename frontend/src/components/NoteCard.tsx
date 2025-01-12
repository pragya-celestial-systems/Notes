import React from "react";
import { NoteInterface } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import ColorDialog from "./ColorDialog";
import { useColor } from "../context/Color";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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

function NoteCard({ title, description, _id }: NoteInterface) {
  const styles = useStyles();
  const { color } = useColor();

  function handleMoveToTrash(e: React.BaseSyntheticEvent) {
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
      moveFromTrash(trashData);

      // step 2. Remove selected note from the data
      deleteNote();

      // step 3. Notify user that the trash has been deleted
      toast.success("Note has been moved to trash");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Couldn't move note to the trash.");
    }
  }

  async function deleteNote() {
    try {
      const trashUrl: string | undefined =
        process.env.REACT_APP_BACKEND_API_URL;
      await axios.delete(`${trashUrl}/${_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function moveFromTrash(data: NoteInterface) {
    try {
      const trashUrl: string | undefined = process.env.REACT_APP_Trash_API_URL;

      if (trashUrl) {
        await axios.post(trashUrl, data, {
          headers: {
            "Content-type": "application/json",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className={styles.container}
        style={{ background: color ? color : "whitesmoke" }}
        id="card"
      >
        <div className={styles.topContainer}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className={styles.buttonContainer}>
            <IconButton
              className={styles.deleteButton}
              onClick={handleMoveToTrash}
              id="deleteButton"
            >
              <DeleteIcon style={{ color: "#c50000" }} />
            </IconButton>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <ColorDialog />
        </div>
      </div>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default NoteCard;
