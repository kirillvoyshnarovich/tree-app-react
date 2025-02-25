import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AddNodeDialogProps } from '../../types/AddNodeDialog';
import { useTheme } from '@mui/material/styles';

export default function AddNodeDialog({ open, onClose, onSave }: AddNodeDialogProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();
  const fullWindows = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(name);
      setName('');
    } catch (error) {
      console.error('Error when adding a node:', error);
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
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        {isLoading ? <CircularProgress size={24} /> : <TextField
          autoFocus
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Node Name'
        />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}