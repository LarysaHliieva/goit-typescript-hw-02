import { useState, useEffect, useRef } from "react";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";

import * as API from "../services/api";

import styles from "./App.module.css";

import type { ImageItem } from "../types/type";

const perPage = 12;

type SearchParams = {
  filter: string;
};

const App = () => {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [residue, setResidue] = useState<number>(0);

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filter) return;

    const fetchImages = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const images = await API.searchImages(filter, page, perPage);
        setItems((items) => [...items, ...images.hits]);
        setResidue(images.total - page * perPage);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [filter, page]);

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

  const onSearch = ({ filter: newFilter }: SearchParams): void => {
    if (newFilter === filter && page === 1) return;

    setFilter(newFilter);
    setItems([]);
    setPage(1);
    setResidue(0);
  };

  const loadMore = (): void => setPage((prev) => prev + 1);

  const isNotFound: boolean = !items.length && Boolean(filter) && !loading;

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
