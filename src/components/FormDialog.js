import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ obj, setObj }) {
  //  const [open, setOpen] = React.useState(false);
  if (!obj) return <></>;

  // if (obj) setOpen(true);

  const handleClose = () => {
    //setOpen(false);
    setObj(null);
  };
  function handleCancel() {
    console.log('cancel');
    handleClose()
  }
  function handleSave() {
    console.log('saving');
    handleClose()
  }

  return (
    <div>
      <Dialog open={!!obj} onClose={handleClose}>
        <DialogTitle>edit {obj.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          {Object.entries(obj.toChange()).map(([key, value]) => {
            return (
            <TextField
              autoFocus
              margin="dense"
              id={key}
              label={key}
              type={typeof(value)}
              fullWidth
              variant="standard"
              value={value}
            />
          )})}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function getSetters(obj) {
  const setters = Object.getOwnPropertyDescriptors(obj);
  console.log(setters);
  const setterNames = Object.keys(setters).filter((name) => setters[name].set);
  console.log(setterNames);
  return setterNames;
}
