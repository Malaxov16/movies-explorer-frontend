// AboutMe — компонент с информацией о студенте


import './AboutMe.css';
import photo from '../../images/photo.jpg'

const AboutMe = () => {
  return(
    <section className="aboutme">
      <h1 className="aboutme__title">Студент</h1>
      <div className="aboutme__profile">
        <div className="aboutme__text-container">
          <h2 className="aboutme__name-student">Виктор</h2>
          <p className="aboutme__professional">Фронтенд-разработчик, 50 лет</p>
          <p className="aboutme__about">Я родился в городе Вологда. Получил образование инженера-механика, вся моя жизнь связана с транспортом. Год назад у меня появилась возможность обучиться веб-разработке и перейти работать в IT в проект, который реализует мои друзья. Сейчас у меня уже есть планы на работу в данном проекте.</p>
          <a href="https://github.com" className="aboutme__github">Github</a>
        </div>
        <img src={photo} className="aboutme__photo" alt='фото' />
      </div>
    </section>
  )
};

export default AboutMe;