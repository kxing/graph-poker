import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";

interface AddPlayerModalProps {
  open: boolean;
  handleAddPlayer: (name: string) => void;
  handleClose: () => void;
}

const AddPlayerModal = (props: AddPlayerModalProps) => {
  const [name, setName] = useState<string>("");

  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onButtonSubmit = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (name.length === 0) {
      return;
    }
    props.handleAddPlayer(name);
    setName("");
  };
  const handleClose = (_e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleClose();
  };

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle>Results</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new player:</DialogContentText>
          <TextField onChange={onTextChanged} value={name} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="outlined" onClick={onButtonSubmit}>
            Add Player
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPlayerModal;
