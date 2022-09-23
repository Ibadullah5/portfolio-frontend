/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'
import '../extraInfoPage.scss'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64'

function ExtraInfoPage() {

  const navigate = useNavigate();

  const [cookies, setCookies, removeCookies] = useCookies(['user'])
  
  const [formData, setFormData] =React.useState({
   username: '',
   firstName: '',
   age: '',
   birthPlace: '',
   job: '',
   image: '',
   insta: '',
   linkdin: '',
   github:'',
   about_me:'',
   experience:'',
   qualification:''

 })

  function handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    setFormData({...formData, [name]: value})
    console.log(formData)
  }

  async function submitForm(e){
    e.preventDefault()
    console.log(cookies.token )
    console.log(formData)
    try
    {
      const response = await axios.post("http://localhost:5000/user", formData ,
        {headers:{ 'Authorization': cookies.token }}
  )
    
    if(response.status === 200) navigate('/dashboard')
  }catch(err){
    console.log(err)
  }
  }

  return (
    <>
    <form method='POST' className='form' onSubmit={submitForm}>
      <div className='child_one'>
    <h1 style={{color:"rgb(250, 67, 204)"}}>Please Finish Login By Filling The Following Fields</h1>
        <div className='name'>
        <input className='input_field' name="firstName" type='text' value={formData.firstName} placeholder="Full Name" onChange={handleChange}/>
        </div>
    <input className='input_field' name="age" type='text' value={formData.age} placeholder='Age' onChange={handleChange}/>
    <input className='input_field' name="birthPlace" type='text' value={formData.birthPlace} placeholder='Birthplace' onChange={handleChange}/>
    <input className='input_field' name="job" type='text' value={formData.job} placeholder='Job' onChange={handleChange}/>
    <input className='input_field' name="insta" type='text' value={formData.insta} placeholder='Instagram Username' onChange={handleChange}/>
    <input className='input_field' name="github" type='text' value={formData.github} placeholder='Github Username' onChange={handleChange}/>
    <input className='input_field' name="linkdin" type='text' value={formData.linkdin} placeholder='Linkdin Username' onChange={handleChange}/>
    </div>
    <div className='child_two'>
    <input className='text_field' type='textarea' name='about_me' value={formData.about_me} placeholder='Tell Something About Yourself' onChange={handleChange}/>
    <input className='text_field' type='textarea' name='experience' value={formData.experience} placeholder='What is Your Experience' onChange={handleChange}/>
    <input className='text_field' type='textarea' name='qualification' value={formData.qualification} placeholder='What is Your Qualifiaction' onChange={handleChange}/>
      <label style={{color: "rgb(250, 67, 204)"}}>Upload An Image</label>
      <FileBase64
        type="file"
        multiple={false}
        onDone= {({base64}) => setFormData({...formData, image:base64})} />
    </div>
    <div>
    </div>
    </form>
    
    <button className='button' onClick={submitForm}>Create Profile</button>
    </>
  )
}

export default ExtraInfoPage