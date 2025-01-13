import React, { useEffect } from "react";
import { NoteInterface, NotesInterface, useNotes } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import EditNoteForm from "../components/EditNoteForm";
import CreateNoteForm from "../components/CreateNoteForm";
import { getOrSetData } from "../utility";
import { toast, ToastContainer } from "react-toastify";

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
            <EditNoteForm
              key={index}
              noteData={{
                title: note.title,
                description: note.description,
                id: note._id,
                bgColor:note.bgColor,
              }}
            />
          ))}
      </div>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default Home;
