import React, { useState }  from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import {setCurrentUser} from '../actions';
var base64 = require('base-64');



const Login = (props) => {
  const [data, setValues] = useState({});

  const handleInput = event => {
    setValues({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToAccess = base64.encode(`${data.email}:${data.password}`);
    
    const body = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${dataToAccess}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKeyToken: '8251b7df4773748ecbd2335b4adea25ff22a6398e42705532d0ce5299fdcbdb8'}),
    };
    try {
      const result = await fetch('http://localhost:3000/api/auth/sign-in', body).then((resul) => resul.json());
      
      if(result.statusCode === 401){
        swal('¡Error!', '¡Usuario no autorizado!', 'error');
      }else {

        props.setCurrentUser(result.user);
        props.history.push('/');

      }
    } catch (error) {
      swal('Error!', 'Error de autenticación!', 'error');
    }
    
  }

  return (
  <div className='login'>
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type='email' name='email' onChange={handleInput} className='form-control' id='email' placeholder='Email'/>
        </div>
        
        <div className='form-group'>
          <input type='password' name='password' onChange={handleInput} className='form-control' id='password' placeholder='Password'/>
        </div>

        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
    </div>
  </div>
  )
};

const mapDispatchToProps = {
  setCurrentUser,
};

export default connect(null, mapDispatchToProps)(Login);