import { useEffect, useState } from 'react';

import './SearchForm.css'
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

const SearchForm = ({ handleQueryMovies, handleSwitchShortMovie, checkShortMovie, onSubmit, onSwitch }) => {
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (localStorage.getItem('searchString')) {
      setSearchString(localStorage.getItem('searchString'));
    }
  },[])

  function handleChangeSearch(e) {
    setSearchString(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    handleQueryMovies(searchString);
  }
  
  return(
    <section className='search'>
      <form className='search__form' name='search-form' onSubmit={handleSearch}>
        <input type="text" className='search__field' name='search' value={searchString || ''} placeholder='Фильм' required onChange={handleChangeSearch} />
        <button type='submit' className='search__button'>Найти</button>
      </form>
      <FilterCheckBox handleSwitchSortMovie={handleSwitchShortMovie} checkShortMovie={checkShortMovie} />
    </section>
  )
};

export default SearchForm;