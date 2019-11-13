import React from 'react';
import UserItem from '../components/UserItem';
import Message from '../components/Message';
import avatar from '../assets/static/man.png';

const Home = () => (
  <div className='app'>
    <div className='header'>
    </div>
    
    <div className='aside h-100'>
      <ul className="list-group">
        <UserItem name="Jose Luis" count="2"/>
      </ul>
    </div>
    
    <div className='chat-room'>
      <div className='entry-chats h-100'>
        <Message style='message' message='Hi!!!' avatar={avatar}/>
      </div>
    </div>

    <div className='chat-input h-100'>
      <form className="form-inline">
        <input type="text" className="form-control col-sm-9 mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Mensaje..."/>
        <button type="submit" className="btn btn-primary col-sm-2 mb-2">Enviar</button>
      </form>
    </div>
  </div>
);

export default Home;
