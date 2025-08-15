import { useState } from "react";
import Modal from "../../Modal/Modal";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { webformatURL, tags, largeImageURL } = item;

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

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
