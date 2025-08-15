import { useState, useEffect, useRef } from "react";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";

import * as API from "../services/api";

import styles from "./App.module.css";

const perPage = 12;

const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [residue, setResidue] = useState(0);

  const galleryRef = useRef(null);

  // Fetch images when filter or page changes
  useEffect(() => {
    if (!filter) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const images = await API.searchImages(filter, page, perPage);
        setItems((prevItems) => [...prevItems, ...images.hits]);
        setResidue(images.total - page * perPage);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [filter, page]);

  // Smooth scroll after items update
  useEffect(() => {
    if (items.length === 0 || !galleryRef.current) return;

    const firstCard = galleryRef.current.firstElementChild?.firstElementChild;
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }
  }, [items]);

  const onSearch = ({ filter: newFilter }) => {
    if (newFilter === filter && page === 1) return;

    setFilter(newFilter);
    setItems([]);
    setPage(1);
    setResidue(0);
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const isNotFound = !items.length && filter && !loading;

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSearch} />

      <div ref={galleryRef}>
        {items.length > 0 && <ImageGallery items={items} />}
      </div>

      {error && (
        <p className={styles.message}>
          😥 Something went wrong... Please, reload and try again!
        </p>
      )}

      <Loader visible={loading} />

      {residue > 0 && <Button onClick={loadMore} disabled={loading} />}

      {isNotFound && (
        <p className={styles.message}>
          🙄 Sorry... Nothing was found for your request.
        </p>
      )}
    </div>
  );
};

export default App;
