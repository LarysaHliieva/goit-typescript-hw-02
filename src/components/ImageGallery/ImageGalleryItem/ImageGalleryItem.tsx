import { useState } from "react";
import Modal from "../../Modal/Modal";
import styles from "./ImageGalleryItem.module.css";
import type { ImageItem } from "../../../types/type";

interface ImageGalleryItemProps {
  item: ImageItem;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { webformatURL, tags, largeImageURL } = item;

  const openModal = (): void => setIsOpenModal(true);
  const closeModal = (): void => setIsOpenModal(false);

  return (
    <>
      <li className={styles.galleryItem} onClick={openModal}>
        <img className={styles.image} src={webformatURL} alt={tags} />
      </li>
      {isOpenModal && (
        <Modal url={largeImageURL} alt={tags} onClose={closeModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;
