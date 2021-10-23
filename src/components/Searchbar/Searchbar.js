import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

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
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={submitSearchValue}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
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
