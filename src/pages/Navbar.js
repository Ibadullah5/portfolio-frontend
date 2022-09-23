import React from 'react'
import { Link } from 'react-router-dom';
import '../navbar.css'

function Navbar() {
  return(
  <div>
    <>
    <nav >
  <div className='bara-container'>
    <a  className='link-image' href="/">
      <img src='https://www.kindpng.com/picc/m/394-3941580_portfolio-circle-hd-png-download.png'
      style={{width:'100px'}}
      alt='logo'></img></a>
    <div >
      <ul className='nav-container'>
        <li>
          <Link className='link' aria-current="page" to="/">Login</Link>
        </li>
        <li>
          <Link className='link' to="/signup">Signup</Link>
        </li>
        <li >
          <a className='link'  href="http://localhost:3001/profile">See User Portfolios</a>
        </li>
        </ul>
    </div>
  </div>
</nav>
</>
  </div>) 
}

export default Navbar