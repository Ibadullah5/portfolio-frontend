/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { faCheck, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import '../edit.css'

export default function Dashboard() {
  
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const [user, setUser] = React.useState({})
  const [aboutMe, setAboutMe] = React.useState('');
  const [experience, setExperience] = React.useState(user.experience);
  const [qualification, setQualification] = React.useState(user.qualification);
  const [formData, setFormData] =React.useState({
    username: '',
    firstName: '',
    lastName:'',
    age: '',
    birthPlace: '',
    job: '',
    image:'' ,
    insta:'' ,
    linkdin: '',
    github:'',
    about_me:'',
    experience:'',
    qualification:''
 })

  const fetchData = async() => {
    try
    {
      const response = await axios.get('http://localhost:5000/get-user', {
      headers:{ 'Authorization': cookies.token }
  })
  setFormData({
    username: response.data.email,
    firstName: response.data.first_name,
    lastName:response.data.last_name,
    age: response.data.age,
    birthPlace: response.data.birthplace,
    job: response.data.job,
    image: response.data.image,
    insta: response.data.insta,
    linkdin: response.data.linkdin,
    github:response.data.github,
    about_me:response.data.about_me,
    experience:response.data.experience,
    qualification:response.data.qualification
  })
    setUser(response.data)
    setAboutMe(response.data.about_me.slice(0,250))
    setExperience(response.data.experience.slice(0,250))
    setQualification(response.data.qualification.slice(0,250))
  }catch(err){
    console.log(err)
    if(err.request.status === 403) console.log("Forbidden Page")
  }
}
useEffect(() =>{
      fetchData()
    }, [])


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

function cancel(){
  navigate('/dashboard')
}


  return (
   <form>
    <div style={{display:'flex', marginLeft: '95%', gap:'5px'}}>
    {user.first_name && <button 
   className='logout-button' 
   onClick={cancel} >
     <FontAwesomeIcon className='sign-out-icon' icon={faXmark} color="#4d4d4e"/>
     </button>}
    {user.first_name && <button 
   className='logout-button' 
   onClick={submitForm} >
     <FontAwesomeIcon className='sign-out-icon' icon={faCheck} color="#4d4d4e"/>
     </button>}
     </div>
    <div className='container'>
      <div className='intro-div'>
      {user.first_name && <img src={user.image}  className='image' alt='UserImage'/>}
      {user.first_name && <input className='input_field' name='firstName' onChange={handleChange} value={formData.firstName}></input>}
      {user.last_name && <input className='input_field' name='lastName' onChange={handleChange} value={formData.lastName}></input>}
      {user.age && <input className='input_field' name='age' onChange={handleChange} value={formData.age}></input>}
      {user.birthplace && <input className='input_field' name='birthPlace' onChange={handleChange} value={formData.birthPlace}></input>}
      {user.job && <input className='input_field' name='job' onChange={handleChange} value={formData.job}></input>}
      </div>
      <div className='about-me'>
        {user.about_me && <h1>About Me</h1>}
        {user.about_me && <textarea className='textarea' name='about_me' onChange={handleChange} value={formData.about_me}></textarea>}
        {user.experience && <h1>Experience</h1>}
        {user.about_me && <textarea className='textarea' name='experience' onChange={handleChange} value={formData.experience}></textarea>}
        {user.qualification && <h1>Qualification</h1>}
        {user.about_me && <textarea className='textarea' name='qualification' onChange={handleChange} value={formData.qualification}></textarea>}
        {user.about_me && <h1>Contact</h1>}
        <div className='contacts'>
        {user.first_name && <p>Instagram</p>}
        {user.first_name && <input className='input_field1' type='text' name='insta' onChange={handleChange} value={formData.insta}></input>}{user.last_name && <label>Github</label>}
        {user.first_name && <input className='input_field1' type='text' name='github' onChange={handleChange} value={formData.github}></input>}{user.last_name && <label>Linkdin</label>}
        {user.first_name && <input className='input_field1' type='text' name='linkdin' onChange={handleChange} value={formData.linkdin}></input>}</div>
      </div>
      </div>
      </form>
  )
}