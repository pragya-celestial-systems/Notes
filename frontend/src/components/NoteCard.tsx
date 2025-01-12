import React from "react";
import { NoteInterface } from "../context/Notes";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    background: "whitesmoke",
    padding: "1rem",
    borderRadius: "5px",
    margin: "1rem",
    height: "200px",
    width: "500px",
  },
});

function NoteCard({ title, description }: NoteInterface) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default NoteCard;
