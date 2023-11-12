//PopupMessage - компонент отвечает за вывод сообщения об ошибке

import './PopupMessage.css';

const PopupMessage = ({msg, setMessage}) => {

  function onClose () {
    setMessage({
      isOpen: false,
      textMessage: '',
    })
  }

  return(
    <div className={`popup-msg ${msg.isOpen ? 'popup-msg_opened' : ''}`}>
      <button type="button" aria-label="Закрыть" className="popup-msg__close-button" onClick={onClose}/>
      <p className="popup-msg__text">
        {msg.textMessage}
      </p>
    </div>
  )
};

export default PopupMessage;