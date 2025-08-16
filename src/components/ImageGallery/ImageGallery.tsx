import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

import styles from "./ImageGallery.module.css";

const ImageGallery = ({ items = [] }) => {
  return (
    <ul className={styles.gallery} id="gallery">
      {items.map((item) => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ImageGallery;
