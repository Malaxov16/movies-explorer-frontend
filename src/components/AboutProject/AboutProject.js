// AboutProject — компонент с описанием дипломного проекта

import './AboutProject.css';

const AboutProject = () => {
  return(
    <section className="about" id="more">
      <h1 className="about__title">О проекте</h1>
      <div className="about__info">
          <h2 className="about__info-subtitle">Дипломный проект включал 5 этапов</h2>
          <p className="about__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <h2 className="about__info-subtitle">На выполнение диплома ушло 5 недель</h2>
          <p className="about__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about__timeline">
        <p className="about__time-back">1 неделя</p>
        <p className="about__time-front">4 недели</p>
        <p className="about__timetext">Back-end</p>
        <p className="about__timetext">Front-end</p>
      </div>
    </section>
  )
};

export default AboutProject;