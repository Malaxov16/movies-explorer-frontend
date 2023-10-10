// Profile — компонент страницы редактирования профиля

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Profile.css';

const Profile = ( {name}) => {
  const [isEdit, setIsEdit] = useState(false);

  const hendlerSaveProfile = (e) => {
    e.preventDefault();
    console.log('Сохранить изменения профиля');
    setIsEdit(false);
  };

  function hendlerEditProfile() {
    setIsEdit(true);
    console.log('Редактировать профиль')
  };

  function hendlerSignOut() {
    console.log('Выйти')
  };

  useEffect(() => {
    setIsEdit(false)
  }, [])

  return(
    <main className="profile">
      <div className='profile__component'>
        <h1 className="profile__title">Привет, Виктор!</h1>
        <form className="profile__form" onSubmit={hendlerSaveProfile}>
          <div className='profile__fields'>
            <label className='profile__field-label' for="name">Имя</label>
            <input required name="name" id="name" className="profile__field" disabled/>
          </div>
          <div className='profile__fields'>
            <label className='profile__field-label' for="email">E-mail</label>
            <input required name="email" id="email" className="profile__field" disabled/>
          </div>
          <p className='profile__error'>Ошибка</p>
          {isEdit && (<input type='submit' value='Сохранить' className="profile__save-button"></input>)}
        </form>
        {!isEdit && (
          <>
            <button className="profile__edit-button" onClick={hendlerEditProfile}>Редактировать</button>
            <Link to="/" className="profile__out-link" onClick={hendlerSignOut}>Выйти</Link>
          </>
        )}
      </div>
    </main>
  )
};

export default Profile;