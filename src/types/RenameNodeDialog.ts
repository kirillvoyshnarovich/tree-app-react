export interface RenameNodeDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (name: string) => Promise<void>;
    currentName: string;
}