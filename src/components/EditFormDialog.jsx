import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FormDialog({ obj, setObj, reloader }) {
  //  const [open, setOpen] = React.useState(false);
  const [tempData, setTempData] = React.useState({});
  const navigate = useNavigate();
  function reloadPage() {
    reloader ? reloader() : navigate('./');
  }
  React.useEffect(() => {
    // obj ? obj.toChange() : {}
    setTempData({});
  }, [obj]);
  if (!obj) return <></>;

  // if (obj) setOpen(true);

  const handleClose = () => {
    //setOpen(false);
    setObj(null);
  };
  function handleCancel() {
    console.log("cancel");
    handleClose();
  }
  function handleSave() {
    console.log("saving");
    console.log(obj);
    obj.saveChanges(tempData).then(reloadPage);
    handleClose();
  }
  function handleDelete() {
    if (window.confirm("למחוק?!")) {
      obj.delete().then(() =>
      reloadPage());
    }
    handleClose();
  }

  return (
    <div>
      <Dialog open={!!obj} onClose={handleClose}>
        <DialogTitle>ערוך {obj.name}:</DialogTitle>
        <DialogContent>
          {Object.entries(obj.toChange()).map(
            ([key, { type, onChange, options }]) => {
              if (type == typeof "" || type == typeof 0)
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id={key + "_setter"}
                    label={key}
                    type={type}
                    fullWidth
                    variant="standard"
                    defaultValue={obj[key]}
                    onChange={onChange}
                  />
                );
              else if (type == "option")
                return (
                  <Select
                    id={key + "_option_menu"}
                    defaultValue={`${obj[key]}`}
                    label={key}
                    onChange={onChange}
                  >
                    {options.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                );
              else return <></>;
            }
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
          <Button onClick={handleDelete}>Delete</Button>
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
