import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface NoteDataInterface {
  noteData: {
    title: string;
    description: string;
    _id?: string;
    bgColor?: string;
  };
  onEdit?: (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    id: string | undefined
  ) => void;
}

export default function EditNoteForm({ noteData, onEdit }: NoteDataInterface) {
  const [open, setOpen] = React.useState(false);
  const { title, description, _id } = noteData;
  const [titleVal, setTitleVal] = React.useState<string>("");
  const [descVal, setDescVal] = React.useState<string>("");

  React.useEffect(() => {
    setTitleVal(title);
    setDescVal(description);
  }, [title, description]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(e, titleVal, descVal, _id);
      handleClose();
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") setTitleVal(value);
    else setDescVal(value);
  };

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
        Edit
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSave,
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
            value={descVal}
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
    </React.Fragment>
  );
}
