import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { toast, ToastContainer } from "react-toastify";
import { getOrSetData } from "../utility";
import { DialogActions, IconButton, Tooltip } from "@mui/material";
import { NotesInterface, useNotes } from "../context/Notes";
import PaletteIcon from '@mui/icons-material/Palette';

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
});

export default function ColorDialog({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();
  const { setNotes }: NotesInterface = useNotes();

  const handleClickOpen = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleChangeColor(e: React.BaseSyntheticEvent) {
    try {
      const data: object = {
        bgColor: e.target.textContent,
      };

      await getOrSetData(`api/${id}`, "PATCH", JSON.stringify(data));
      const response = await getOrSetData("api", "GET");
      setNotes(response);
      setOpen(false);
    } catch (error: unknown) {
      console.log(error);
      toast.error("Something went wrong. Couldn't change the color");
    }
  }

  return (
    <React.Fragment>
      <Tooltip title="Set Color" placement="top" arrow>
        <IconButton onClick={handleClickOpen}>
          <PaletteIcon sx={{ color: "grey", fontSize: "2rem" }}/>
        </IconButton>
      </Tooltip>
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
        <DialogActions>
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={handleClose}>Cancel</span>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
