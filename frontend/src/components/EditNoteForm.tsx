import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NoteCard from "./NoteCard";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { getOrSetData } from "../utility";
import { useNotes } from "../context/Notes";

interface NoteDataInterface {
  noteData: {
    title: string;
    description: string;
    id: string | undefined;
    bgColor?: string;
  };
}

export default function EditNoteForm(props: NoteDataInterface) {
  const [open, setOpen] = React.useState(false);
  const { title, description, id, bgColor } = props.noteData;
  const [titleVal, setTitleVal] = React.useState<string>("");
  const [descVal, setDescVal] = React.useState<string>("");
  const { setNotes } = useNotes();

  React.useEffect(() => {
    setTitleVal(title);
    setDescVal(description);
  }, []);

  const handleClickOpen = (e: React.BaseSyntheticEvent) => {
    if (e.target.closest("#card")) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSaveChanges(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const userInput = {
        title: titleVal,
        description: descVal,
      };

      const formJson = JSON.stringify(userInput);

      // update the data in the database
      await getOrSetData(`api/${id}`, "PATCH", formJson);
      const data = await getOrSetData("api", "GET");
      setNotes(data);
      // close the dialog and display toast
      handleClose();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  function handleChangeValue(e: React.BaseSyntheticEvent) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "title") setTitleVal(value);
    else setDescVal(value);
  }

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
        <NoteCard
          title={title}
          description={description}
          _id={id}
          bgColor={bgColor}
        />
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
            value={titleVal}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChangeValue}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            defaultValue={descVal}
            onChange={handleChangeValue}
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
      <ToastContainer closeOnClick={true} />
    </React.Fragment>
  );
}
