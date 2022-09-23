/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedin, faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons'
import '../searchpage.css';
import Navbar from './Navbar';
import UI from './UI';
import coins from './coinarray'

function SearchedUser(){
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState([])
  const url = window.location.href;
  console.log(url)

  useEffect( () =>{
    async function getUsers(){
      try{
        const response =await axios.get('http://localhost:5000/get-usernames');
      console.log(response.data)
      setData(response.data)
    }catch(err){
      console.group(err)
    }
    }
    getUsers()
   
  },[])

  function onChange(e){
    setValue(e.target.value)
  }

  return(
    <div >
      {url.length===29 &&
      <div>
      <Navbar />
      <form type='get' className='search-form'>
      <div style={{display:'flex', flexDirection:'column'}}>
      <input className='input-fields' placeholder='Search Here' type='text' onChange={onChange} name='username' value={value} autoComplete='off'></input>
      <div className='dropdown'>
        {data.filter(item =>{
          const searchItem = value.toLowerCase()
          const searchValue = item.first_name.toLowerCase()
          return searchItem !== searchValue && searchItem && searchValue.startsWith(searchItem)
        }).slice(0,5)
        .map((item) => <div className='item-div' key={item._id} onClick={() => setValue(item.first_name)}>{item.first_name}</div>)}
      </div>
      </div>
      <input className='search-button' type='submit' value='Search'></input>
    </form>
    </div>
    }
    {url.length > 29 && <User />}
    </div>
  )
}

function User() {
  const [ showConverter, setShowConverter ] = React.useState(false)
  const [user, setUser] = React.useState({})
  const username = window.location.href.slice(39).replace('+', ' ')
  const [aboutMe, setAboutMe] = React.useState('');
  const [experience, setExperience] = React.useState(user.experience);
  const [qualification, setQualification] = React.useState(user.qualification);
  const [ismore, setIsMore ] = React.useState(false)
  const [isEmore, setEIsMore ] = React.useState(false)
  const [isQmore, setQIsMore ] = React.useState(false)
  const[data, setData] = React.useState('')
  let url = 'https://api.coingecko.com/api/v3/simple/price?ids='
  let keys = Object.values(coins)

  for(let i = 0 ; i<keys.length ; i++){
    if(i !== keys.length-1){
      url += keys[i]+"," 
    }
    else{
      url += keys[i]+"&vs_currencies=USD" 
    }
    }
    
    React.useEffect(() =>{
      fetch(url).then(res => res.json()).then(data => setData(data))
    },[]) 
  
  async function searchUser(){
    const response =await axios.get('http://localhost:5000/search', {params : {
      username: username
    }})
    console.log(response.data)
    setUser(response.data)
    setAboutMe(response.data.about_me.slice(0,250))
    setExperience(response.data.experience.slice(0,250))
    setQualification(response.data.qualification.slice(0,250))
 }

 React.useEffect(() =>{
  searchUser()
 }, [])

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

  return (<div>
    <Navbar />
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0'}}>
    <div className='container'>
      <div className='intro-div'>
      {user.first_name&& <img src={user.image}  className='image' alt='UserImage'/>}
      {user.first_name && <h3>{user.first_name}</h3>}
      {user.age && <h3>Age : {user.age}</h3>}
      {user.birthplace && <h3>Birth Place : {user.birthplace}</h3>}
      {user.job && <h3>Job : {user.job}</h3>}
      </div>
      <div className='about-me'>
        {user.about_me && <h1>About Me</h1>}
        <p>{aboutMe}</p>
        {user.about_me && aboutMe.length>249 && <button onClick={showAbout}>{ismore ? 'Less...' : 'More...'}</button>}
        {user.experience && <h1>Experience</h1>}
        <p>{experience}</p>
        {user.about_me && experience.length>249 &&  <button onClick={showExp}>{isEmore ? 'Less...' : 'More...'}</button>}
        {user.qualification && <h1>Qualification</h1>}
        <p>{qualification}</p>
       {user.about_me && qualification.length>249 &&  <button onClick={showQuali}>{isQmore ? 'Less...' : 'More...'}</button>}
        {user.about_me && <h1>Contact</h1>}
        <div className='contacts'>
        {user.insta && <a href={`https://instagram.com/${user.insta}`} target="_blank" rel='noreferrer'><FontAwesomeIcon className='icons' icon={faInstagram} color="#FFF"/></a>}
        {user.github && <a href={`https://github.com/${user.github}`} target="_blank" rel='noreferrer'><FontAwesomeIcon className='icons' icon={faGithub} color="#FFF"/></a>}
        {user.linkdin && <a href={`https://linkdin.com/${user.linkdin}`} target="_blank" rel='noreferrer'><FontAwesomeIcon className='icons' icon={faLinkedin} color="#FFF"/></a>}
        </div>
        </div>
      </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'  }}>
      {showConverter && <UI data={data} />}
      <button style={{width:'100px', height:'40px'}} onClick={() => setShowConverter((prevState => !prevState))}>
      {showConverter ? 'Collapse' : 'Pay'}
      </button>
      </div>
      </div>
  )
}

export default SearchedUser