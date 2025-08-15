import { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ url, alt, onClose }) => {
  const handleClose = (e) => {
    if (e.currentTarget === e.target || e.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
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
