import React, { useEffect } from "react";
import { NoteInterface, NotesInterface, useNotes } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import CreateNoteForm from "../components/CreateNoteForm";
import { getOrSetData } from "../utility";
import { toast, ToastContainer } from "react-toastify";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NoteCard from "../components/NoteCard";
import { useAuth0 } from "@auth0/auth0-react";

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
    height: "70vh",
    width: "100svw",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "grey",
  },
});

function Home() {
  const { notes }: NotesInterface = useNotes();
  const { user } = useAuth0();
  const styles = useStyles();
  
  console.log(user);
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
        {notes.length <= 0 && <div className={styles.messageBox}>
          <LightbulbIcon sx={{fontSize: "10rem", color: "lightgrey"}}/>
          <h1>Notes that you add appear here</h1></div>}
      </div>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default Home;
