import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
    <nav>
  <div className="logo">MySite</div>
  <ul className="nav-links">
    <li><a href="#"><Link to="/view">Home</Link></a></li>
    <li><a href="#">
         <Link to="/add">Add</Link></a></li>
    <li><a href="#"> <Link to="/edit">Edit</Link></a></li>
    {/* <li><a href="#"> <Link to="/add">Contact</Link></a></li> */}
  </ul>
</nav>

    </div>
  )
}

export default Nav