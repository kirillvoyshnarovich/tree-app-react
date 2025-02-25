export interface DeleteNodeDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    name: string;
}