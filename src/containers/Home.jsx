import React from 'react';
import fetch from 'node-fetch';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import UserItem from '../components/UserItem';
import Message from '../components/Message';
import avatar from '../assets/static/man.png';
import socket from 'socket.io-client';

class Home extends React.Component {
  constructor(props) {
    super(props);

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

      this.setState(prevState => ({
        messages: [...prevState.messages, data]
      }));

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

      const messageSaved = await fetch('http://localhost:3000/api/messages/', detail)
      .then((result) => result.json());
      
    }
  }

  async getUsers() {
    this.setState({loading: true });
    
    const dataResponse = await fetch('http://localhost:3000/api/users')
    .then((dataResponse) => dataResponse.json());

    this.setState({loading: false, users: dataResponse.data });
  }

  async getMessages(userId) {
    this.setState({loading: true });

    const currentChat = await fetch(`http://localhost:3000/api/chats/${userId}`)
    .then((chat) => chat.json());
    
    const currentMessages = await fetch(`http://localhost:3000/api/messages/${currentChat.data[0]._id}`)
    .then((messages) => messages.json());

    this.setState({loading: false, messages: currentMessages.data, currentChatId: currentChat.data[0]._id });

  }

  render() {
    const {currentUser} = this.props;
    const {messages} = this.state;
    let cleanMessages = [];

    if(this.state.loading === true) {
      return <h1>Loading ...</h1>
    }

    if(this.state.error === true){
      return <h1>Error</h1>
    }

    if(currentUser === undefined){
      return <Redirect to='/login'/>
    }

    const users = this.state.users.filter((user) => user._id !== currentUser.id);

    if(messages){
      cleanMessages = messages.filter((message) => {
        if (message.userId === currentUser.id) {
          message.messageStyle = 'message-self';
        }else{
          message.messageStyle = 'message';
        }
  
        return message;
      });
    }

    return (
      <div className='app'>
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
                cleanMessages.map((message) => < Message key={message._id} messageStyle={message.messageStyle} message={message.message} avatar={avatar} />)
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    users: state.users,
    currentChatId: state.currentChatId,
    messages: state.messages,
  };
};


export default connect(mapStateToProps, null)(Home);
