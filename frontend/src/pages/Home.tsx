import React from "react";
import { NoteInterface, NotesInterface, useNotes } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import EditNoteForm from "../components/EditNoteForm";
import CreateNoteForm from "../components/CreateNoteForm";

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

function Home() {
  const { notes }: NotesInterface = useNotes();
  const styles = useStyles();

  return (
    <>
      <div className={styles.topContainer}>
        <h1 className={styles.heading}>All Notes</h1>
        <CreateNoteForm />
      </div>
      <div className={styles.notesContainer}>
        {notes &&
          notes.map((note: NoteInterface, index: number) => (
            <EditNoteForm
              key={index}
              noteData={{
                title: note.title,
                description: note.description,
                id: note._id,
              }}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
