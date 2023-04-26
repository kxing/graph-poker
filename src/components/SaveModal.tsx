import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface SaveModalProps {
  gameJson: string;
  open: boolean;
  handleClose: () => void;
}

const SaveModal = (props: SaveModalProps) => {
  const handleClose = (_e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleClose();
  };

  const prettyJson = JSON.stringify(JSON.parse(props.gameJson), null, 4);

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle>Save Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CodeEditor
              value={prettyJson}
              language="js"
              readOnly={true}
              style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                width: "500px",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveModal;
