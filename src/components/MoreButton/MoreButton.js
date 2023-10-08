// MoreButton - компонент, который отвечает за добавление новых карточек для отрисовки

import './MoreButton.css'

const MoreButton = ({onMoreClick}) => {

  function hendlerMoreClick() {
    console.log('Отрисовать дополнительные карточки');
  };

  return(
    <div className="more">
      <button className="more__button" onClick={hendlerMoreClick}>Еще</button>
    </div>
  )
};

export default MoreButton;