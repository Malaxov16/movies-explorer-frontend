import { useEffect } from 'react';

import './SearchForm.css'
import FilterCheckBox from '../FilterCheckbox/FilterCheckBox';

const SearchForm = ({ onSubmit, onSwitch }) => {
  
  return(
    <section className='search'>
      <form className='search__form' name='search-form' /*onSubmit={hendlSearch}*/>
        <input type="text" className='search__field' name='search' placeholder='Фильм' required /*onChange={mock}*/ />
        <button type='submit' className='search__button'>Найти</button>
      </form>
      <FilterCheckBox />
    </section>
  )
};

export default SearchForm;