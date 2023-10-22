// Profile — компонент страницы редактирования профиля

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Profile = ( {name}) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const [isEdit, setIsEdit] = useState(false);

  const hendlerSaveProfile = (e) => {
    e.preventDefault();
    console.log('Сохранить изменения профиля');
    setIsEdit(false);
  };

  function hendlerEditProfile() {
    setIsEdit(true);
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
          {isEdit && (<button type='submit' value='Сохранить' className={`profile__save-button ${!isValid ? 'profile__save-button_disabled' : ''}`} disabled={!isValid}>Сохранить</button>)}
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