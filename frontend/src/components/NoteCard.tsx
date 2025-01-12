import React, { useEffect } from "react";
import { NoteInterface } from "../context/Notes";
import { makeStyles } from "@mui/styles";
import ColorDialog from "./ColorDialog";
import { useColor } from "../context/Color";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

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

function NoteCard({ title, description }: NoteInterface) {
  const styles = useStyles();
  const { color } = useColor();

  useEffect(() => {
    console.log(color);
  }, [color]);

  function handleMoveToTrash(e: React.BaseSyntheticEvent) {
    e.stopPropagation();
  }

  return (
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
  );
}

export default NoteCard;
