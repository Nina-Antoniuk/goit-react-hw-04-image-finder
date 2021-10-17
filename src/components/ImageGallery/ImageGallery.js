import { Component } from 'react';
import { toast } from 'react-toastify';
import { v1 as uuid } from 'uuid';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import FetchPhotos from '../../services/pixabay';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';

const newFetchPhotos = new FetchPhotos(
  'https://pixabay.com/api/',
  '23078743-735eb07845251e1f6bfe1c97b',
);

class ImageGallery extends Component {
  state = {
    searchResults: [],
    status: 'idle',
    error: null,
    showModal: false,
    activeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.searchValue;
    const currentValue = this.props.searchValue;

    if (prevValue !== currentValue) {
      this.setState({ status: 'pending' });
      newFetchPhotos.page = 1;
      newFetchPhotos.searchQuery = currentValue;
      newFetchPhotos
        .fetchPhotos()
        .then(result => {
          this.setState({
            searchResults: result.hits,
            status: 'resolve',
          });
        })
        .catch(err => {
          this.setState({ error: err, status: 'error' });
        });
    }
  }

  loadMore = () => {
    newFetchPhotos.page += 1;
    newFetchPhotos.fetchPhotos().then(response => {
      this.setState(prevState => ({
        searchResults: [...prevState.searchResults, ...response.hits],
      }));

      window.scrollTo({
        top: document.querySelector('.ImageGallery').scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  getTarget = e => {
    this.setState({
      activeImage: e.target.dataset.source,
    });
  };

  render() {
    const status = this.state.status;
    const { toggleModal, getTarget, state, loadMore } = this;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return (
        <Loader type="ThreeDots" color="#3f51b5" height={100} width={100} />
      );
    }

    if (status === 'rejected') {
      // toast.error('The request was rejected', {toastId: uuid()})
      return (
        <div className="info">
          <b>Opps, the request was rejected. Try again.</b>
        </div>
      );
    }

    if (status === 'resolve') {
      if (this.state.searchResults.length === 0) {
        // toast.error('Sorry, no matches was found', {toastId: uuid()})
        return (
          <div className="info">
            <b>Sorry, no matches was found</b>
          </div>
        );
      }

      return (
        <>
          <ul className="ImageGallery">
            {this.state.searchResults.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
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
              },
            )}
          </ul>

          <Button loadMore={loadMore} />

          {state.showModal && (
            <Modal switcher={toggleModal}>
              <img className="modalImage" src={state.activeImage} alt="" />
            </Modal>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};

export default ImageGallery;
