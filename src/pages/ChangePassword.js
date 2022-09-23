/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

function ChangePassword() {

  const navigate = useNavigate()
  const [prevPass, setPrevPass] = React.useState('')
  const [confirmPass, setConfirmPass] = React.useState('')
  const [newPass, setNewPass] = React.useState('')
  const [cookies, setCookies, removeCookies] = useCookies(['user']);

  async function onSubmit(e){
    e.preventDefault()
    console.log(prevPass);
    console.log((confirmPass));
    console.log(newPass);
    try
    {
      if(prevPass === confirmPass)
      {
        const response = await axios.post("http://localhost:5000/change-password", {'prevPass':prevPass, 'newPass':newPass} ,
        {headers:{ 'Authorization': cookies.token }})
        console.log('Pauhnch Ja Bc')
        console.log(response.data)
     if(response.status === 200) navigate('/dashboard')
    }
  if(prevPass !== confirmPass){
    console.log("Password Not Matched")
  }
  }catch(err){
    console.log(err)
  }
  }

  function onprevPassChange(event){
    setPrevPass(event.target.value);
  }

  function onconfirmPassChange(event){
    setConfirmPass(event.target.value);
  }

  function onnewPassChange(event){
    setNewPass(event.target.value);
  }

  return (
    <>
    <div className="container">
	<div className="card">
		<div className="card-image">	
			<h2 className="card-heading">
				Change Password
			</h2>
		</div>
		<form className="card-form" onSubmit={onSubmit}>
						<div className="input">
				<input type="password" className="input-field" value={prevPass} onChange={onprevPassChange}required/>
				<label className="input-label">Password</label>
			</div>
						<div className="input">
				<input type="password" className="input-field" value={confirmPass} onChange={onconfirmPassChange}   required/>
				<label className="input-label">Confirm Password</label>
			</div>
      <div className="input">
				<input type="password" className="input-field" value={newPass} onChange={onnewPassChange}   required/>
				<label className="input-label">New Password</label>
			</div>
      <div className="action">
				<button className="action-button">Change Password</button>
			</div>
		</form>
	</div>
</div>
      </>
  )
}

export default ChangePassword