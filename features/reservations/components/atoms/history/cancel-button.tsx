"use client";
import { useFormStatus } from "react-dom";
type Props = {
    handleCancel: () => void;
    isLoading: boolean;
};
function CancelButton({ handleCancel, isLoading }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="button" onClick={handleCancel} disabled={isLoading || pending}>
      {isLoading ? "Cancelling..." : "Cancel"}
    </button>
  );
}

export default CancelButton;
