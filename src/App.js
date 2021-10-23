import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = value => {
    setSearchValue(value);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery searchValue={searchValue} />
    </div>
  );
}

export default App;
