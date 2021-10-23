import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import FetchPhotos from '../../services/pixabay';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';

const newFetchPhotos = new FetchPhotos(
  'https://pixabay.com/api/',
  '23078743-735eb07845251e1f6bfe1c97b',
);

function ImageGallery({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('init');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setStatus('pending');
    newFetchPhotos.page = 1;
    newFetchPhotos.searchQuery = searchValue;
    newFetchPhotos
      .fetchPhotos()
      .then(result => {
        setSearchResults(result.hits);
        setStatus('resolve');
      })
      .catch(err => {
        setStatus('error');
        setError(err);
      });
  }, [searchValue]);

  const loadMore = () => {
    newFetchPhotos.page += 1;
    newFetchPhotos.fetchPhotos().then(response => {
      setSearchResults([...searchResults, ...response.hits]);

      window.scrollTo({
        top: document.querySelector('.ImageGallery').scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getTarget = e => {
    setActiveImage(e.target.dataset.source);
  };

  if (status === 'init') {
    return (
      <div className={s.info}>
        <b>What shall we look for?</b>
      </div>
    );
  }

  if (status === 'pending') {
    return <Loader type="ThreeDots" color="#3f51b5" height={100} width={100} />;
  }

  if (status === 'rejected') {
    return (
      <div className={s.info}>
        <b>Opps, the request was rejected. Try again.</b>
        <p>{error}</p>
      </div>
    );
  }

  if (status === 'resolve') {
    if (searchResults.length === 0) {
      return (
        <div className={s.info}>
          <b>Sorry, no matches was found</b>
        </div>
      );
    }

    return (
      <>
        <ul className={s.ImageGallery}>
          {searchResults.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                preiew={webformatURL}
                largeImage={largeImageURL}
                openModal={toggleModal}
                getImage={getTarget}
                desc={tags}
              />
            );
          })}
        </ul>

        <Button loadMore={loadMore} />

        {showModal && (
          <Modal switcher={toggleModal}>
            <img className={s.modalImage} src={activeImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};

export default ImageGallery;
