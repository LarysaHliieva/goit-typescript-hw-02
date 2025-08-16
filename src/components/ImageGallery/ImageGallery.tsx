import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

import styles from "./ImageGallery.module.css";
import type { ImageItem } from "../../types/type";

interface ImageGalleryProps {
  items: ImageItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items = [] }) => {
  return (
    <ul className={styles.gallery} id="gallery">
      {items.map((item) => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ImageGallery;
