import React, { useEffect } from "react";
import { NoteInterface, NotesInterface, useNotes } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import CreateNoteForm from "../components/CreateNoteForm";
import { getOrSetData } from "../utility";
import { toast, ToastContainer } from "react-toastify";
import NoteCard from "../components/NoteCard";

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

  const { setNotes }: NotesInterface = useNotes();

  async function getData() {
    try {
      const response = await getOrSetData("api", "GET");
      setNotes(response);
    } catch (error: unknown) {
      toast.error("Something went wrong. Couldn't fetch data.");
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.topContainer}>
        <h1 className={styles.heading}>All Notes</h1>
        <CreateNoteForm />
      </div>
      <div className={styles.notesContainer}>
        {notes &&
          notes.map((note: NoteInterface, index: number) => (
            <NoteCard
              key={index}
              title={note.title}
              description={note.description}
              bgColor={note.bgColor}
              _id={note._id}
            />
          ))}
      </div>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default Home;
