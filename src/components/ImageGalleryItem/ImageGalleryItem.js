import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ openModal, getImage, largeImage, preiew, desc }) {
  function onItemClick(e) {
    openModal();
    getImage(e);
  }

  return (
    <li className={s.ImageGalleryItem} onClick={onItemClick}>
      <img
        className={s.ImageGalleryItemImage}
        src={preiew}
        data-source={largeImage}
        alt={desc}
      />
    </li>
  );
}

ImageGalleryItem.default = {
  preiew:
    'https://dummyimage.com/280x150/2a2a2a/ffffff&text=Product+image+placeholder',
  largeImage:
    'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product+image+placeholder',
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func,
  getImage: PropTypes.func,
  largeImage: PropTypes.string,
  preiew: PropTypes.string,
  desc: PropTypes.string,
};

export default ImageGalleryItem;
