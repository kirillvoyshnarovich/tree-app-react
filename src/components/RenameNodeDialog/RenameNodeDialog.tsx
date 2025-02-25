import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { RenameNodeDialogProps } from '../../types/RenameNodeDialog';

export default function RenameNodeDialog({ open, onClose, onSave, currentName }: RenameNodeDialogProps) {
  const [name, setName] = useState(currentName);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const fullWindows = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(name);
    } catch (error) {
      console.error('Error when changing the node name:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullWindows}
      slotProps={{
        paper: {
          sx: {
            minWidth: '500px',
          },
        }
      }}
    >
      <DialogTitle>Rename</DialogTitle>
      <DialogContent>
        {isLoading ? <CircularProgress size={24} /> : <TextField
          autoFocus
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Node Name"
        />}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
}