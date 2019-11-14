import React from 'react';
import fetch from 'node-fetch';
import UserItem from '../components/UserItem';
import Message from '../components/Message';
import avatar from '../assets/static/man.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {"_id":"5dcb9358a88dc61d7215d8f0","userName":"BAUTISTAJ","name":"Luis","middleName":"Campos","birthday":"02-09-1990","email":"root@hotmail.com","telephone":"0000000000","password":"$2b$10$4A407R1hndI2PiEgBFsC7eSNBvPxlxSYkVu3f6S6DEFI.5t2WENm2","isAdmin":true},
      data: [],
      loading: undefined,
      error: undefined
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData() {
    this.setState({ error: false });
    this.setState({ loading: true });

    fetch('http://localhost:3000/data')
    .then((result) =>  result.json())
    .then((json) => {

      this.setState({ data: json });
      this.setState({ loading: false });

    }).catch(() => {
      this.setState({ error: true });
      this.setState({ loading: false });
    });
  }

  render() {
    if( this.state.loading === true){
      return <p>Loading .... </p>
    }

    const {data, currentUser} = this.state;
    const users =data.filter((user) => user._id !== currentUser._id);

    return (
      <div className='app'>
        <div className='header'>
        </div>
        
        <div className='aside h-100'>
          <ul className="list-group">
            {
              users.map((user) => <UserItem name={ user.userName } count="2" key={user._id}/>)
            }
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
  }
}

export default Home;
