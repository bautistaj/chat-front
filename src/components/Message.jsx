import React from 'react';

const Message = ({style, message, avatar}) => (
  <div className={style}>
    <img src={avatar} alt=''className="avatar"/>
      <div className='alert alert-secondary' role='alert'>
        {message}
      </div>
  </div>
);

export default Message;