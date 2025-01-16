import React, { useEffect } from "react";
import { getOrSetData } from "../utility";
import { makeStyles } from "@mui/styles";
import { NotesInterface, useNotes } from "../context/Notes";
import TrashNoteCard from "../components/TrashNoteCard";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "80%",
  },
  heading: {
    margin: "2rem 8px",
  },
  notesContainer: {
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  messageBox: {
    display: "flex",
    height: "90vh",
    width: "100svw",
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
    flexDirection: "column",
  },
});

function Trash() {
  const { trashNotes, setTrashNotes }: NotesInterface = useNotes();
  const styles = useStyles();

  async function getTrashNotes() {
    try {
      const response = await getOrSetData("api/trash", "GET");
      setTrashNotes(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrashNotes();
  }, []);

  return (
    <>
      {trashNotes && trashNotes.length > 0 && <div className={styles.topContainer}>
        <h1 className={styles.heading}>Trash Bin</h1>
      </div>}
      <div className={styles.notesContainer}>
        {trashNotes &&
          trashNotes.map((note, index) => (
            <TrashNoteCard
              key={index}
              title={note.title}
              description={note.description}
              bgColor={note.bgColor || "whitesmoke"}
              _id={note._id}
            />
          ))}
        {trashNotes.length <= 0 && (
          <div className={styles.messageBox}>
            <DeleteIcon sx={{fontSize: "10rem", color: "lightgrey"}}/>
            <h1>Your Trash is Empty</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Trash;
