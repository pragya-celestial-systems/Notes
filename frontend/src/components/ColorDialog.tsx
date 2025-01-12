import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useColor } from "../context/Color";
import { makeStyles } from "@mui/styles";

const colors = ["AntiqueWhite", "AliceBlue", "beige", "bisque", "whitesmoke"];

const useStyles = makeStyles({
  box: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: "0.7rem",
  },
  colorBox: {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    display: "inline",
    marginRight: "0.5rem",
  },
  colorButton: {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    background: "white",
  },
});

export default function ColorDialog() {
  const [open, setOpen] = React.useState(false);
  const { setColor } = useColor();
  const styles = useStyles();

  const handleClickOpen = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeColor(e: React.BaseSyntheticEvent) {
    localStorage.setItem("color", e.target.textContent);
    setColor(e.target.textContent);
    setOpen(false);
  }

  return (
    <React.Fragment>
      <div className={styles.colorButton} onClick={handleClickOpen}></div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Change Card's Color"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Set color
          </DialogContentText>
          {colors.map((color, index) => (
            <div key={index} className={styles.box} onClick={handleChangeColor}>
              <div
                className={styles.colorBox}
                style={{ background: color }}
              ></div>
              <span>{color === "whitesmoke" ? "default" : color}</span>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
