import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useColor } from "../context/Color";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  id : string | undefined;
}

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

export default function ColorDialog({ id }: Props) {
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
    changeColor(e.target.textContent);
    setOpen(false);
  }

  async function changeColor(color: string) {
    try {
      const data = {
        bgColor: color,
      };

      const apiUrl = `${process.env.REACT_APP_BACKEND_API_URL}/${id}` || `http://localhost:3000/api/${id}`;
      const response = await axios.patch(apiUrl, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.warn("The background color has been updated");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
