import React from 'react';
import fetch from 'node-fetch';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import UserItem from '../components/UserItem';
import Message from '../components/Message';
import avatar from '../assets/static/man.png';
import socket from 'socket.io-client';
import Loader from '../components/Loader';
import util from '../util';
import swal from 'sweetalert';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.API ='http://localhost:3000/api';
    this.state = {
      loading: undefined,
      error: undefined,
      users: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    const URI = 'http://localhost:3000';
    const socketClient = socket(URI);
    socketClient.on('message', (data) => {
      const {currentChatId} = this.state;
      if(currentChatId !== undefined && currentChatId === data.chatId){
        this.setState(prevState => ({
          messages: [...prevState.messages, data]
        }));
      }
    });

    this.getUsers();
  }

  onChangeHandler(event) {
    this.setState({message: event.target.value});
  }

  async addMessage(event) {
    event.preventDefault();
    const {currentUser} = this.props;
    const {message, currentChatId} = this.state;
    
    if(message) {
      const newMessage = {
        'chatId': currentChatId,
        'userId': currentUser.id,
        'message': message,
        'date': new Date(),
      };
      const detail = {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: {'Content-Type': 'application/json'},
      }

      const messageSaved = await fetch(`${this.API}/messages/`, detail)
      .then((result) => result.json());
      
    }
  }

  async getMessages(userId) {
    this.setState({loading: true });
    const {currentUser} = this.props;
    const users = `${currentUser.id},${userId}`;
    
    let currentChatId = undefined;
    let messages = [];

    const currentChat = await fetch(`${this.API}/chats/${users}`)
    .then((chat) => chat.json());

    if(currentChat.data.length === 0){
      const newChat = {
	      users: [currentUser.id,userId]
      }
      const detail = {
        method: 'POST',
        body: JSON.stringify(newChat),
        headers: {'Content-Type': 'application/json'},
      }
      
      const responseNewChatId =  await fetch(`${this.API}/chats/`,detail)
      .then((chat) => chat.json());
      currentChatId = responseNewChatId.data;
      messages = [];

    }else {
      const currentMessages = await fetch(`${this.API}/messages/${currentChat.data[0]._id}`)
      .then((messages) => messages.json());
      currentChatId = currentChat.data[0]._id;

      messages = currentMessages.data;
    }
    
    this.setState({loading: false, messages: messages, currentChatId: currentChatId });  
  }
  
  async getUsers() {
    this.setState({loading: true });
    const dataResponse = await fetch(`${this.API}/users`)
    .then((dataResponse) => dataResponse.json());

    this.setState({loading: false, users: dataResponse.data });
  }

  render() {
    const {currentUser} = this.props;
    const {messages, currentChatId} = this.state;
    let cleanMessages = [];

    if(this.state.loading === true) {
      return <Loader />
    }

    if(this.state.error === true) {
      return <h1>Error</h1>
    }

    if(currentUser === undefined){
      return <Redirect to='/login'/>
    }

    const users = this.state.users.filter((user) => user._id !== currentUser.id);

    if(messages){
      cleanMessages = util.cleanMessages(messages, currentUser);
    }

    return (
      <div className='app container'>
        <div className='aside h-100'>
          <ul className='list-group'>
            {
              users.map((user) => <div onClick={() => this.getMessages(user._id) } key={user._id} > 
                <UserItem name={user.userName} key={user._id} />
              </div>)
            }
          </ul>
        </div>
        <div className='chat-room'>
          <div className='entry-chats h-100'>
            <>
              {
                cleanMessages.map((message) => < Message key={message._id} messageStyle={message.messageStyle} message={message.message} avatar={avatar} />)
              }
            </>
          </div>
        </div>
        { currentChatId &&
          <div className='chat-input h-100'>
            <form className='form-inline' onSubmit={this.addMessage}>
              <input type='text' onChange={this.onChangeHandler} className='form-control col-sm-9 mb-2 mr-sm-2' id='inlineFormInputName2' placeholder='Mensaje...'/>
              <button type='submit' className='btn btn-primary col-sm-2 mb-2'>Enviar</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};


export default connect(mapStateToProps, null)(Home);
