import styles from "./styles.module.css";
import { useFormStatus } from "react-dom";

function ConfirmationButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className={styles.formButton} disabled={pending || disabled}>
      {pending ? "Processing..." : "Confirm"}
    </button>
  );
}

export default ConfirmationButton;
