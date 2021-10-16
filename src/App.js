import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
  };

  handleSubmit = value => {
    this.setState({
      searchValue: value,
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
