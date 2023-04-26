import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";

interface LoadModalProps {
  open: boolean;
  handleLoad: (gameJson: string) => void;
  handleClose: () => void;
}

const LoadModal = (props: LoadModalProps) => {
  const [gameData, setGameData] = useState<string>("");

  const handleOnCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGameData(e.target.value);
  };

  const handleLoad = (_e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleLoad(gameData);
  };
  const handleClose = (_e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleClose();
  };

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle>Load Game</DialogTitle>
        <DialogContent>
          <CodeEditor
            value={gameData}
            language="js"
            onChange={handleOnCodeChange}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              width: "500px",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleLoad}>Load</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoadModal;
