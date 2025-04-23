// import React, { useEffect } from 'react'
import { useState } from 'react'
import './singin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";
function Singin() {

    const navigator=useNavigate()


      const [input, setinput] = useState({
        fullname:'',
        email:'',
        username:'',
        password:'',

        })
    
        const handlechange = (e) => {
            const name = e.target.name
            const value = e.target.value
            setinput({ ...input, [name]: value })
        }

        const handlesubmit=async(e)=>{
            e.preventDefault()
            await axios.post('http://localhost:3000/users',input)

            navigator('/login')
        }
    return (
        <div>
            <div className="bodydiv">
      <div className="signup-container">
        <h2><FaUserCircle /> Create Account</h2>
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="fullname"><FaUser /> Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={input.fullname}
              onChange={handlechange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope /> Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={handlechange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username"><FaUser /> Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              value={input.username}
              onChange={handlechange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={input.password}
              onChange={handlechange}
              required
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="footer">
          Already have an account? <a href="#">Login here</a>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Singin