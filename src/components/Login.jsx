import React, {  useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaEnvelope, FaLock } from "react-icons/fa";
function Login() {
    const nav = useNavigate()
    const [input, setinput] = useState({
        id:Math.floor(Math.random()*100),
        username:'',
        password:''
    })
    const handlechange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setinput({ ...input, [name]: value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        const res = await axios.get('http://localhost:3000/users')
        console.log(res.data);

        console.log(input);
        const user = res.data.find((val) =>
            val.email == input.username && val.password == input.password
        )
        if (user) {
            await axios.post('http://localhost:3000/login', input)
            
            nav('/view')


        }
        else {
            alert('Please enter the correct information');

        }

    




    }
    return (
        <div>
            <div className="bodydiv">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handlesubmit}>
          <div className="input-group">
            <label htmlFor="username"><FaEnvelope /> Username</label>
            <input
              type="email"
              id="username"
              placeholder="example@gmail.com"
              required
              name="username"
              value={input.username}
              onChange={handlechange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              name="password"
              value={input.password}
              onChange={handlechange}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="footer">
          <p>Don't have an account? <Link to="/signin">Sign up</Link></p>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Login
