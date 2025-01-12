import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NoteCard from "./NoteCard";
import { Box } from "@mui/material";
import axios from "axios";

interface NoteDataInterface {
  noteData: {
    title: string;
    description: string;
    id: string | undefined;
  };
}

export default function EditNoteForm(props: NoteDataInterface) {
  const [open, setOpen] = React.useState(false);
  const { title, description, id } = props.noteData;

  const handleClickOpen = (e: React.BaseSyntheticEvent) => {
    if(e.target.closest("#card")){
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSaveChanges(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    SaveNote(formJson);
    handleClose();
  }

  async function SaveNote(data: object) {
    try {
      const apiUrl = `${process.env.REACT_APP_BACKEND_API_URL}/${id}`;

      const response = await axios.patch(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
        <NoteCard title={title} description={description} />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSaveChanges,
        }}
      >
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
