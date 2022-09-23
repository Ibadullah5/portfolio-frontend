/* eslint-disable no-unused-vars */
import React from 'react';
import '../signup.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import Navbar from './Navbar';

export default function SignupPage(){

  let navigate = useNavigate()

  const [messsage, setMessage] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pass, setpass] = React.useState('')
  const [cookies, setCookies, removeCookies] = useCookies(['users'])

  function onUsernameChange(e){
    setEmail(e.target.value)
  }

  function onpassChange(e){
    setpass(e.target.value)
  }

 async function onSubmit(e){
    e.preventDefault()
    
    try{ 
    console.log("posting")

    const response = await axios.post("http://localhost:5000/signup", { email , pass } );
    console.log(response)
    setCookies( 'token', response.data.token )
    console.log("pauch gya")
     const success = response.status === 201

     if(success) navigate('/complete-signup')
  }
  catch(err){
    console.log(err)
    if(err.response.status === 409) setMessage("User Already Exist. Please Login")
  }
}


  return(
    <>
    <Navbar />
    <div>
    <div className="container">
	<div className="card">
		<div className="card-image">	
			<h2 className="card-heading">
				Get started
				<small>Create your personal portfolio online</small>
			</h2>
		</div>
		<form className="card-form" onSubmit={onSubmit}>
						<div className="input">
				<input type="text" className="input-field" value={email} onChange={onUsernameChange}required/>
				<label className="input-label">Email</label>
			</div>
						<div className="input">
				<input type="password" className="input-field" value={pass} onChange={onpassChange}   required/>
				<label className="input-label">Password</label>
			</div>
      <div>
        <label style={{color:'rgb(250, 67, 204)'}}>{messsage}</label>
      </div>
			<div className="action">
				<button className="action-button">Get started</button>
			</div>
		</form>
		<div className="card-info">
			<p style={{margin:'0'}}>Already Have An Account</p>
      <Link to='/' style={{color:'rgb(250, 67, 204)'}}>Login</Link>
		</div>
	</div>
</div>
</div>
      </>
  )
}