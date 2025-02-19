"use client";

import { useFormStatus } from "react-dom";

function CancelButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? <span>Proceccing...</span> : <span>Confirm</span>}
    </button>
  );
}

export default CancelButton;
