import React from 'react';

const Message = ({ messageStyle, message, avatar }) => (
  <div className={messageStyle}>
    <img src={avatar} alt='avatar' className='avatar' />
    <div className='alert alert-secondary' role='alert'>
      {message}
    </div>
  </div>
);

export default Message;
