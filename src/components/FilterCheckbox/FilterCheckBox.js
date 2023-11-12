// компонент FilterCheckBox - это переключатель, который отвечает за дополнительное условие поиска короткометражек
// реализован при помощи элемента checkbox, стилизованного с использованием псевдоклассов ::before и ::after

import { useState } from "react";

import './FilterCheckBox.css';

const FilterCheckBox = ({handleSwitchSortMovie, checkShortMovie}) => {
  return (
    <div className="switcher">
      <input type="checkbox" className="switcher__input" name="checkbox" onChange={handleSwitchSortMovie} checked={checkShortMovie}></input>
      <label className="switcher__name">Короткометражки</label>
    </div>
  )
}

export default FilterCheckBox;