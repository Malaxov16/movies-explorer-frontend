// AccountButton - кнопка переход на страницу профиля (переиспользуется)

import { Link, useLocation } from 'react-router-dom';

import profileIcon from '../../images/profile.png';
import './AccountButton.css';

const AccountButton = () => {
  const location = useLocation();

  return(
    <Link to="/profile" className={`account-button__profile ${location.pathname === "/" ? "account-button__profile_home-page" : ""}`}>
      <p className='account-button__profile-link'>Аккаунт</p>
      <img src={profileIcon} className='account-button__profile-icon' alt='профиль'></img>
    </Link>
  )
};

export default AccountButton;