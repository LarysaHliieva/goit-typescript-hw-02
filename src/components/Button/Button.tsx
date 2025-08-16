import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      className={styles.loadMore}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      Load more
    </button>
  );
};

export default Button;
