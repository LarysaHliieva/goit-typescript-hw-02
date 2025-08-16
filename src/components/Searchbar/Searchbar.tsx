import { useState, type ChangeEvent, type FormEvent } from "react";
import { CiSearch } from "react-icons/ci";

import styles from "./Searchbar.module.css";
import type { SearchParams } from "../../types/type";

interface SearchbarProps {
  onSubmit: (data: SearchParams) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSubmit }) => {
  const [filter, setFilter] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({ filter });
    setFilter("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <CiSearch size={24} />
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          onChange={handleChange}
          name="filter"
          value={filter}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
