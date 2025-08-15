

import styles from './Button.module.css';

const Button = ({ onClick, disabled = false }) => {
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


