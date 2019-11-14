import React from 'react';
import {Link} from 'react-router-dom';

const Login = () => (
  <div className="login">
    <div className='login-container'>
      <form>
        <div className='form-group'>
          <input type='email' className='form-control' id='email' placeholder='Email'/>
        </div>
        
        <div className='form-group'>
          <input type='password' className='form-control' id='password' placeholder='Password'/>
        </div>

        <Link type='submit' className='btn btn-primary' to="/home">Login</Link>
  
      </form>
      <Link to="/register">Registrar</Link>
    </div>
  </div>
  
);


export default Login;