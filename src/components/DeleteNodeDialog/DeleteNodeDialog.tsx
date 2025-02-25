import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DeleteNodeDialogProps } from '../../types/DeleteNodeDialog';

export default function DeleteNodeDialog({ open, onClose, onConfirm, name }: DeleteNodeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();
  const fullWindows = useMediaQuery(theme.breakpoints.down('sm'));

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error('Node deletion error:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullWindows}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: '500px',
          },
        }
      }}
    >
    <DialogTitle>Delete</DialogTitle>
    <DialogContent>
      {isLoading ? <CircularProgress size={24} sx={{margin: '0 auto'}} /> : 'Do you want to delete ' + name + ' ?'}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleConfirm} color="error">Delete</Button>
    </DialogActions>
    </Dialog>
  );
}