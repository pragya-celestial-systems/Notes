import axios from "axios";
import React, { useEffect, useState } from "react";
import { getOrSetData } from "../utility";
import { makeStyles } from "@mui/styles";
import EditNoteForm from "../components/EditNoteForm";
import { NoteInterface, NotesInterface, useNotes } from "../context/Notes";
import NoteCard from "../components/NoteCard";
import TrashNoteCard from "../components/TrashNoteCard";

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
      <div className={styles.topContainer}>
        <h1 className={styles.heading}>Trash Bin</h1>
      </div>
      <div className={styles.notesContainer}>
        {trashNotes && trashNotes .map((note, index) => (
          <TrashNoteCard key={index} title={note.title} description={note.description} bgColor={note.bgColor || "whitesmoke"} _id={note._id}/>
        ))}
      </div>
    </>
  );
}

export default Trash;