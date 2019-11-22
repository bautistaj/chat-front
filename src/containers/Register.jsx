import React from 'react';
import fetch from 'node-fetch';
import swal from 'sweetalert';

class Register extends React.Component{
    constructor(){
        super();
        this.API = 'http://localhost:3000';
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    async handleFormSubmit(event){
      event.preventDefault();
      const { userName, middleName, birthday, email, telephone, password, isAdmin } = this.state;
      const newUser = {
        "userName": userName,
        "name":"Laura",
        "middleName": middleName,
        "birthday": birthday,
        "email": email,
        "telephone": telephone,
        "password": password,
        "isAdmin": isAdmin
      }
      
      const detail = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {'Content-Type': 'application/json'},
      }

      try {

        const userSaved = await fetch('http://localhost:3000/api/users/', detail)
        .then((result) => result.json());

        if(userSaved.statusCode){
          swal('¡Error!', `¡${userSaved.message}!`, 'error');
        }else{
          swal('Usuario creado!', `¡Usuario creado correctamente!`, 'success');
        }


      } catch (error) {
        swal('¡Error!', `¡${error.message}!`, 'error');
      }
      

    }

    handleOnChange(event){
      this.setState({
        [event.target.name]: event.target.value 
      });
    }

    render(){
        return(
            <div className='container'>
            <form onSubmit={this.handleFormSubmit}>
            <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Nombre</label>
          <div className='col-sm-10'>
            <input name='name' onChange={this.handleOnChange} type='text' className='form-control' placeholder='Nombre'/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Apellidos</label>
          <div className='col-sm-10'>
            <input name='middleName'  onChange={this.handleOnChange}  type='text' className='form-control' placeholder='Apellidos'/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Email</label>
          <div className='col-sm-10'>
            <input name='email'  onChange={this.handleOnChange}  type='email' className='form-control' placeholder='Email'/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Nombre de usuario</label>
          <div className='col-sm-10'>
            <input name='userName'  onChange={this.handleOnChange}  type='text' className='form-control' placeholder='Nombre de usuario'/>
          </div>
        </div>
        <div className='form-group row'>
          <label  className='col-sm-2 col-form-label'>Teléfono</label>
          <div className='col-sm-10'>
            <input name='telephone' onChange={this.handleOnChange}   type='text' className='form-control' placeholder='Teléfono'/>
          </div>
        </div>
        <div className='form-group row'>
          <label  className='col-sm-2 col-form-label'>Fecha de nacimiento</label>
          <div className='col-sm-10'>
            <input name='birthday' onChange={this.handleOnChange}   type='date' className='form-control' placeholder='Fecha de nacimiento'/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Password</label>
          <div className='col-sm-10'>
            <input name='password'  onChange={this.handleOnChange}  type='password' className='form-control' placeholder='Password'/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>Administrador</label>
          <div className='col-sm-9'>
            <input type='checkbox' onChange={this.handleOnChange}  name='isAdmin' className='form-check-input' id='exampleCheck1'/>
          </div>
        </div>
        <button type='submit' className='btn btn-primary mb-2'>Registrar</button>
      </form>
          </div>
        );
    }
}

export default Register;