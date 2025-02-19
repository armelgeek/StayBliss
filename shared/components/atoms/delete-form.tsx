"use client";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface DeleteFormProps {
  deleteAction: (state?: { error: string }) => { error: string; status?: string } | Promise<{ error: string; status?: string }>;
  showLabel?: boolean;
}

const initialState = {
  error: "",
};

function DeleteForm({ deleteAction, showLabel = false }: DeleteFormProps) {
  const [state, formAction] = useFormState(deleteAction, initialState);

  if (state?.error) {
    toast.error(state.error);
  } else if (state?.status === "success") {
    toast.success("Your reservation has been deleted");
  }

  return (
    <form action={formAction}>
      <DeleteButton showLabel={showLabel} />
    </form>
  );
}

function DeleteButton({ showLabel }: { showLabel: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      <span>
        <Trash />
      </span>
      {showLabel && <span>Delete</span>}
    </button>
  );
}

export default DeleteForm;
