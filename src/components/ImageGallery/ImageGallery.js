import { Component, useState, useEffect } from 'react';
// import { v1 as uuid } from 'uuid';
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

function ImageGallery({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
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

  if (status === 'idle') {
    return <div></div>;
  }

  if (status === 'pending') {
    return <Loader type="ThreeDots" color="#3f51b5" height={100} width={100} />;
  }

  if (status === 'rejected') {
    console.log(error);
    return (
      <div className="info">
        <b>Opps, the request was rejected. Try again.</b>
      </div>
    );
  }

  if (status === 'resolve') {
    if (searchResults.length === 0) {
      return (
        <div className="info">
          <b>Sorry, no matches was found</b>
        </div>
      );
    }

    return (
      <>
        <ul className="ImageGallery">
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
            <img className="modalImage" src={activeImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

// class ImageGallery extends Component {
//   state = {
//     searchResults: [],
//     status: 'idle',
//     error: null,
//     showModal: false,
//     activeImage: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevValue = prevProps.searchValue;
//     const currentValue = this.props.searchValue;

//     if (prevValue !== currentValue) {
//       this.setState({ status: 'pending' });
//       newFetchPhotos.page = 1;
//       newFetchPhotos.searchQuery = currentValue;
//       newFetchPhotos
//         .fetchPhotos()
//         .then(result => {
//           this.setState({
//             searchResults: result.hits,
//             status: 'resolve',
//           });
//         })
//         .catch(err => {
//           this.setState({ error: err, status: 'error' });
//         });
//     }
//   }

//   loadMore = () => {
//     newFetchPhotos.page += 1;
//     newFetchPhotos.fetchPhotos().then(response => {
//       this.setState(prevState => ({
//         searchResults: [...prevState.searchResults, ...response.hits],
//       }));

//       window.scrollTo({
//         top: document.querySelector('.ImageGallery').scrollHeight,
//         behavior: 'smooth',
//       });
//     });
//   };

//   toggleModal = () => {
//     this.setState({
//       showModal: !this.state.showModal,
//     });
//   };

//   getTarget = e => {
//     this.setState({
//       activeImage: e.target.dataset.source,
//     });
//   };

//   render() {
//     const status = this.state.status;
//     const { toggleModal, getTarget, state, loadMore } = this;

//     if (status === 'idle') {
//       return <div></div>;
//     }

//     if (status === 'pending') {
//       return (
//         <Loader type="ThreeDots" color="#3f51b5" height={100} width={100} />
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <div className="info">
//           <b>Opps, the request was rejected. Try again.</b>
//         </div>
//       );
//     }

//     if (status === 'resolve') {
//       if (this.state.searchResults.length === 0) {
//         return (
//           <div className="info">
//             <b>Sorry, no matches was found</b>
//           </div>
//         );
//       }

//       return (
//         <>
//           <ul className="ImageGallery">
//             {this.state.searchResults.map(
//               ({ id, webformatURL, largeImageURL, tags }) => {
//                 return (
//                   <ImageGalleryItem
//                     key={id}
//                     preiew={webformatURL}
//                     largeImage={largeImageURL}
//                     openModal={toggleModal}
//                     getImage={getTarget}
//                     desc={tags}
//                   />
//                 );
//               },
//             )}
//           </ul>

//           <Button loadMore={loadMore} />

//           {state.showModal && (
//             <Modal switcher={toggleModal}>
//               <img className="modalImage" src={state.activeImage} alt="" />
//             </Modal>
//           )}
//         </>
//       );
//     }
//   }
// }

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};

export default ImageGallery;
