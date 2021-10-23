import { useState } from 'react';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const getSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const submitSearchValue = e => {
    e.preventDefault();

    onSubmit(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={submitSearchValue}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={getSearchValue}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
