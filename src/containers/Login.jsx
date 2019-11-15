import React, { useState }  from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import fetch from 'node-fetch';
import { setCurrentUser } from '../actions';
const base64 = require('base-64');

const Login = props => {
  const [form, setValues] = useState({
    email: '', user: {},
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = base64.encode(`${form.email}:${form.password}`);
    const body = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${data}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKeyToken: '8251b7df4773748ecbd2335b4adea25ff22a6398e42705532d0ce5299fdcbdb8'}),
    };

    fetch('http://localhost:3000/api/auth/sign-in', body)
    .then((resul) => resul.json())
    .then((json) => {
      console.log(json.user);
      props.setCurrentUser(json.user);
      props.history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  return(
  <div className="login">
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='email' name='email' onChange={handleInput} className='form-control' id='email' placeholder='Email'/>
        </div>
        
        <div className='form-group'>
          <input type='password' name='password' onChange={handleInput} className='form-control' id='password' placeholder='Password'/>
        </div>

        <button type='submit' className='btn btn-primary' to="/home">Login</button>
      </form>
    </div>
  </div>
  )
};

const mapDispatchToProps = {
  setCurrentUser,
};

export default connect(null, mapDispatchToProps)(Login);