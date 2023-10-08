// Promo — компонент с вёрсткой баннера страницы «О проекте»

import './Promo.css'
import promoImage from '../../images/promo.png'

const Promo = () => {
  return(
    <section className="promo">
      <div className="promo__info">
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
        </div>
        <img src={promoImage} className="promo__image" alt="промо"></img>
      </div>
      <a href="#more" className="promo__more-button">Узнать больше</a>
    </section>
  )
};

export default Promo;