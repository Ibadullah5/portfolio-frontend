/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'
import{ Link,useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

function LoginPage() {

  const navigate = useNavigate()
  const [message, setMessage] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pass, setpass] = React.useState('')
  const [cookies, setCookies, removeCookies] = useCookies('[users]')

  function onUsernameChange(e){
    setEmail(e.target.value)
  }

  function onpassChange(e){
    setpass(e.target.value)
  }

  async function onSubmit(e){
    e.preventDefault()
    try{
    const response = await axios.post('http://localhost:5000/login', { email, pass })
    if(response.data === null) 
    {
      setMessage("Wrong Username Or Password")
      console.log("Wrong Username Or Password")
  }
    else{
      setCookies('token', response.data.token)
      navigate('/dashboard')
    }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <div>
      <Navbar />
    <div className="container">
	<div className="card">
		<div className="card-image">	
			<h2 className="card-heading">
				Login
				<small>Let us login to your online portfolio</small>
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
        <label style={{color:'rgb(250, 67, 204)'}}>{message}</label>
      </div>
			<div className="action">
				<button className="action-button">Login</button>
			</div>
		</form>
		<div className="card-info">
			<p style={{margin:'0'}}>Dont Have An Account</p>
      <Link to='/signup' style={{color:'rgb(250, 67, 204)'}}>Signup</Link>
		</div>
	</div>
</div>
</div>
      </>
  )
}

export default LoginPage