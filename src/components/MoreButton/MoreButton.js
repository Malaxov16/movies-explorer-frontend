// MoreButton - компонент, который отвечает за добавление новых карточек для отрисовки

import './MoreButton.css'

const MoreButton = ({handleMoreButton}) => {

  function hendleMoreClick() {
    handleMoreButton();
  };

  return(
    <div className="more">
      <button className="more__button" onClick={hendleMoreClick}>Еще</button>
    </div>
  )
};

export default MoreButton;