export interface AddNodeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
}