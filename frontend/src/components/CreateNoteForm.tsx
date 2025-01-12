import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function CreateNoteForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSaveChanges(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log("Note created: ", formJson);
    createNote(formJson);
    handleClose();
  }

  async function createNote(data: object) {
    try {
      const apiUrl =
        process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3000/api";
      await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Note created successfully");
    } catch (error) {
      toast.error("Something went wrong. Couldn't create a note.");
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
        <NoteAddIcon />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSaveChanges,
        }}
      >
        <DialogTitle>Create a new note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            minRows={3}
            maxRows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer closeOnClick={true} />
    </React.Fragment>
  );
}
