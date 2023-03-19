import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack';;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    else {
      setOpen(false);
    }
  }
  
  function handleButtonClick(value) {
    props.onButtonClick(value);
    handleClose();
  }


  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>{props.buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          deleteing is permanent and cannot be recovered, you can unpublish content instead. are you sure you want to delete?
          </Typography>
          <Stack direction="row" spacing={2}>
          <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleButtonClick(true)}>
              yes, delete
            </Button>
            <Button size="small" variant="outlined" onClick={() => handleButtonClick(false)}>
              no, unpublish insted
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}