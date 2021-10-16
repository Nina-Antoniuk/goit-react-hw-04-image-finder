import axios from 'axios';
import { toast } from 'react-toastify';
import { v1 as uuid } from 'uuid';

class FetchPhotos {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = '';
    this._page = 1;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    return (this._page = newPage);
  }

  async fetchPhotos() {
    axios.defaults.baseURL = this.base_url;
    try {
      const response = await axios.get(
        `?key=${this.api_key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`,
      );
      return response.data;
    } catch (err) {
      return toast.error(`Something went wrong  ${err}`, { toastId: uuid() });
    }
  }
}

export default FetchPhotos;
