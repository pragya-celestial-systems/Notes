import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteForm from "./EditNoteForm";
import { NoteInterface, useNotes } from "../context/Notes";
import { getOrSetData } from "../utility";

interface Props {
  onDelete?: () => void;
  onRestore?: () => void;
  isTrashFolder?: boolean;
  onTrash?: (e: React.BaseSyntheticEvent) => Promise<void>;
  noteData: NoteInterface;
  onEdit?: () => void;
}

export default function CardMenu({
  onDelete,
  onRestore,
  onTrash,
  isTrashFolder = false,
  noteData,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setNotes } = useNotes();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleSaveChange = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    id: string | undefined,
  ) => {
    try {
      e.preventDefault();
      console.log("clicked");
      if (!id) {
        console.error("ID is undefined. Cannot save changes.");
        return;
      }

      const userInput = {
        title,
        description,
      };

      const formJson = JSON.stringify(userInput);

      // Update the data in the database
      await getOrSetData(`api/${id}`, "PATCH", formJson);
      const data = await getOrSetData("api", "GET");
      setNotes(data);
      setAnchorEl(null);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: "grey" }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {isTrashFolder ? (
          <>
            <MenuItem onClick={onDelete}>Delete Permanently</MenuItem>
            <MenuItem onClick={onRestore}>Restore</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={onTrash}>Delete</MenuItem>
            <MenuItem>
              <EditNoteForm noteData={noteData} onEdit={handleSaveChange} />
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
