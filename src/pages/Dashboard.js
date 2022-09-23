/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import '../dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedin, faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faEdit, faSignOut, faKey} from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
  
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const [user, setUser] = React.useState({})
  const [aboutMe, setAboutMe] = React.useState('');
  const [experience, setExperience] = React.useState(user.experience);
  const [qualification, setQualification] = React.useState(user.qualification);
  const [ismore, setIsMore ] = React.useState(false)
  const [isEmore, setEIsMore ] = React.useState(false)
  const [isQmore, setQIsMore ] = React.useState(false)
  const username = cookies.user;

  const fetchData = async() => {
    try
    {
      const response = await axios.get('http://localhost:5000/get-user', {
      headers:{ 'Authorization': cookies.token }
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
    
    
function logout(){
  removeCookies('token')
  navigate('/signup')
}
function edit(){
  navigate('/edit')
}

function changePassword(){
  navigate('/change-password')
}

  function showAbout(){
    if(!ismore)
    setAboutMe(user.about_me)
    else
    aboutMe.length >250 ? setAboutMe(user.about_me.slice(0,250) + '...') 
    :setAboutMe(user.about_me.slice(0,250))
    setIsMore(!ismore)
  }
  function showExp(){
    if(!isEmore)
    setExperience(user.experience)
    else
    experience.length >250 ? setExperience(user.experience.slice(0,250) + '...') 
    :setExperience(user.experience.slice(0,250))
    setEIsMore(!isEmore)
  }
  function showQuali(){
    if(!isQmore)
    setQualification(user.qualification)
    else
    qualification.length >250 ? setQualification(user.qualification.slice(0,250) + '...') 
    :setQualification(user.qualification.slice(0,250))
    setQIsMore(!isQmore)
  }

  return (
   <div>
    <div style={{display:'flex', marginLeft:'92%', gap:'5px'}}>
    {user.first_name && <button 
    className='logout-button' 
    onClick={changePassword} >
      <FontAwesomeIcon className='sign-out-icons' icon={faKey} color="#FFF"/>
      </button>}
    {user.first_name && <button 
    className='logout-button' 
    onClick={edit} >
      <FontAwesomeIcon className='sign-out-icon' icon={faEdit} color="#FFF"/>
      </button>}
    {user.first_name && <button 
    className='logout-button' 
    onClick={logout} >
      <FontAwesomeIcon className='sign-out-icon' icon={faSignOut} color="#FFF"/>
      </button>}
    </div>
    <div className='container'>
      <div className='intro-div'>
      {user.first_name && <img src={user.image}  className='image' alt='UserImage'/>}
      {user.first_name && <h3>{user.first_name}</h3>}
      {user.age && <h3>Age : {user.age}</h3>}
      {user.birthplace && <h3>Birth Place : {user.birthplace}</h3>}
      {user.job && <h3>Job : {user.job}</h3>}
      {user.job && <a target="_blank" rel='noreferrer'
      style={{textDecoration:'none' , color:'white'}}
      href={`http://localhost:3001/profile?username=${user.first_name}`}>Profile Link</a>}
      </div>
      <div className='about-me'>
        {user.about_me && <h1>About Me</h1>}
        <p>{aboutMe}</p>
        {user.about_me && <button onClick={showAbout}>{ismore ? 'Less...' : 'More...'}</button>}
        {user.experience && <h1>Experience</h1>}
        <p>{experience}</p>
        {user.about_me && <button onClick={showExp}>{isEmore ? 'Less...' : 'More...'}</button>}
        {user.qualification && <h1>Qualification</h1>}
        <p>{qualification}</p>
       {user.about_me && <button onClick={showQuali}>{isQmore ? 'Less...' : 'More...'}</button>}
        {user.about_me && <h1>Contact</h1>}
        <div className='contacts'>
        {user.insta && <a href={`https://instagram.com/${user.insta}`} target="_blank" rel='noreferrer'><FontAwesomeIcon className='icons' icon={faInstagram} color="#FFF"/></a>}
        {user.github && <a href={`https://github.com/${user.github}`} target="_blank" rel='noreferrer'><FontAwesomeIcon className='icons' icon={faGithub} color="#FFF"/></a>}
        {user.linkdin && <a href={`https://linkdin.com/${user.linkdin}`} target="_blank" rel='noreferrer'><FontAwesomeIcon className='icons' icon={faLinkedin} color="#FFF"/></a>}
        </div>
      </div>
      </div>
      </div>
  )
}

export default Dashboard