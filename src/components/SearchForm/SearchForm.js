import { useEffect, useState } from 'react';

import './SearchForm.css'
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

const SearchForm = ({ handleQueryMovies, handleSwitchShortMovie, checkShortMovie, searchStringLocalStorage, onSubmit, onSwitch }) => {
  const [searchString, setSearchString] = useState('');
  const [errorSearchString, setErrorSearchString] =useState(false);


  function handleChangeSearch(e) {
    setSearchString(e.target.value);
    if (e.target.value) {
      setErrorSearchString(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchString) {
      handleQueryMovies(searchString);
    } else {
      setErrorSearchString(true);
    }
  }

  useEffect(() => {
    setSearchString(searchStringLocalStorage)
  }, [searchStringLocalStorage]);
  
  return(
    <section className='search'>
      <form className='search__form' name='search-form' onSubmit={handleSearch}>
        <input type="text" className='search__field' name='search' value={searchString || ''} placeholder='Фильм' onChange={handleChangeSearch} />
        <button type='submit' className='search__button'>Найти</button>
      </form>
      <p className={`search__error-message ${errorSearchString? "search__error-message_visible" : ""}`}>Строка поиска не должна быть пустой</p>
      <FilterCheckBox handleSwitchSortMovie={handleSwitchShortMovie} checkShortMovie={checkShortMovie} />
    </section>
  )
};

export default SearchForm;