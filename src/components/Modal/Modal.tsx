import { useEffect, type MouseEvent } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  url: string;
  alt: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ url, alt, onClose }) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
