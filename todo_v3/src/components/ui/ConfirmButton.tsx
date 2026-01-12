import { useState } from "react";
import { Button } from "./Button";

interface ConfirmButtonProps {
  onConfirm: () => void;
  label?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmButton = ({
  onConfirm,
  label = "Delete",
  // confirmText = "Are you sure?",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmButtonProps) => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        type="button"
        variant="error"
        appearance="outline"
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="error"
        appearance='solid'
        isLoading={isLoading}
        onClick={onConfirm}
        >
        Confirm
      </Button>
      <Button
        type="button"
        variant="neutral"
        appearance="ghost"
        onClick={() => setOpen(false)}
      >
        {cancelText}
      </Button>
    </div>
  );
};


// Usage
{/* 
    <ConfirmButton
        onConfirm={() => deleteStudent(id)}
        isLoading={deleteMutation.isPending}
    /> 
*/}