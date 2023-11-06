// Profile — компонент страницы редактирования профиля
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../constexts/currentUserContext';

const Profile = ( {handleUpdateUser, handleOut}) => {
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();
  const currentUser = React.useContext(CurrentUserContext);

  const [isEdit, setIsEdit] = useState(false);

  let isBlocked = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, setValues]); 

  const hendleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values.name, values.email);
    setIsEdit(false);
  };

  function hendlerEditProfile() {
    setIsEdit(true);
  };

  function hendlerSignOut() {
    console.log('Выйти')
  };

  // useEffect(() => {
  //   setIsEdit(false)
  // }, [])

  return(
    <main className="profile">
      <div className='profile__component'>
        <h1 className="profile__title">Привет, Виктор!</h1>
        <form className="profile__form" onSubmit={hendleSubmit}>
          <div className='profile__fields'>
            <label className='profile__field-label'>Имя</label>
            <input name="name" id="name" value={values.name || ''} className="profile__field" minLength={2} maxLength={30} pattern='([А-Яа-яёA-Za-z \-]+)' required onChange={handleChange} disabled={!isEdit}/>
          </div>
          <span className='profile__field-error-msg'>{errors.name}</span>
          <div className='profile__fields'>
            <label className='profile__field-label'>E-mail</label>
            <input name="email" id="email" value={values.email || ''} className="profile__field" minLength={2} maxLength={30} pattern='(\w+@\w+\.[A-Za-z]+)' required onChange={handleChange} disabled={!isEdit}/>
          </div>
          <span className='profile__field-error-msg'>{errors.email}</span>
          <p className='profile__error'>Ошибка</p>
          {isEdit && (<button type='submit' value='Сохранить' className={`profile__save-button ${isBlocked ? 'profile__save-button_disabled' : ''}`} disabled={isBlocked}>Сохранить</button>)}
        </form>
        {!isEdit && (
          <>
            <button className="profile__edit-button" onClick={hendlerEditProfile}>Редактировать</button>
            <Link to="/" className="profile__out-link" onClick={handleOut}>Выйти</Link>
          </>
        )}
      </div>
    </main>
  )
};

export default Profile;