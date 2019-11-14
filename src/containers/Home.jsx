import React from 'react';
import fetch from 'node-fetch';
import socket from 'socket.io-client';
import UserItem from '../components/UserItem';
import Message from '../components/Message';
import avatar from '../assets/static/man.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      users: [],
      messages: [],
      message: undefined,
      currentChat: undefined,
      loading: true,
      error: false,
    };

    this.getMessages = this.getMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({message: event.target.value});
  }

  addMessage(event) {
    event.preventDefault();
    const {message} = this.state;
    
    if(message) {
      const newMessage = {
        'chatId': this.state.currentChat,
        'userId': this.state.currentUser._id,
        'message': message,
        'date': new Date(),
      };
      const detail = {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: {'Content-Type': 'application/json'},
      }

      fetch('http://localhost:3000/api/messages/', detail)
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
      });
    }
  }

  getMessages(userId) {
    console.log('userId',userId);
    
    fetch(`http://localhost:3000/api/chats/${userId}`)
      .then((chat) => chat.json())
      .then((result) => {
        const chatId = result.data[0]._id;
        this.setState({ currentChat: chatId });
        console.log(chatId);
        
        return fetch(`http://localhost:3000/api/messages/${chatId}`);
      }).then((messages) => messages.json())
      .then((result) => {
        this.setState({ messages: result.data });
      });
  }

  componentDidMount() {
    const URI = 'http://localhost:3000';
    const socketClient = socket(URI);
    socketClient.on('message', (data) => {
      this.setState({ messages: [ ...this.state.messages, data ] });
    });

    fetch(`http://localhost:3000/api/users/5dc968d0e2e9fc0e75927d1e`)
      .then((user) => user.json())
      .then((result) => {
        this.setState({ currentUser: result.data });
        return fetch('http://localhost:3000/api/users');
      }).then((users) => users.json())
      .then((result) => {
        this.setState({ users: result.data, loading: false });
    });
  }

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return (<p>Loading .... </p>);
    }

    let { users, messages } = this.state;
    const { currentUser } = this.state;
    users = users.filter((user) => user._id !== currentUser._id);
    messages = messages.filter((message) => {

      if (message.userId === currentUser._id) {
        message.messageStyle = 'message-self';
      }else{
        message.messageStyle = 'message';
      }

      return message;
    });

    return (
      <div className='app'>
        <div className='header'>
          <h1>Healer</h1>
        </div>
        <div className='aside h-100'>
          <ul className='list-group'>
            {
              users.map((user) => <div onClick={() => this.getMessages(user._id) } key={user._id} > 
                <UserItem name={user.userName} count='2' key={user._id} />
              </div>)
            }
          </ul>
        </div>
        <div className='chat-room'>
          <div className='entry-chats h-100'>
            <>
              {
                messages.map((message) => < Message key={message._id} messageStyle={message.messageStyle} message={message.message} avatar={avatar} />)
              }
            </>
          </div>
        </div>
        <div className='chat-input h-100'>
          <form className='form-inline' onSubmit={this.addMessage}>
            <input type='text' onChange={this.onChangeHandler} className='form-control col-sm-9 mb-2 mr-sm-2' id='inlineFormInputName2' placeholder='Mensaje...'/>
            <button type='submit' className='btn btn-primary col-sm-2 mb-2'>Enviar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
