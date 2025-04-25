import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Edit.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditData } from '../feature/Creteslice';
import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { FaGlobe, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Nav from './Nav';
import Swal from 'sweetalert2'


function Edit() {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    id: nanoid(),
    url: '',
    name: '',
    std: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (location.state) {
      setInput(location.state);
      
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(EditData(input));
    setInput({
      id: nanoid(),
      url: '',
      name: '',
      std: '',
      email: '',
      password: '',
    });
    Swal.fire({
      title: "Updated Successfully...!",
      icon: "success",
      draggable: true
    });
    navigate('/view', {state : "Edit"});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const checkLogin = async () => {
    try {
      const res = await axios.get('http://localhost:3000/login');
  console.log(res.data);
  if (res.data.length === 0) {
    navigate('/login');
  } else {
    navigate('/edit');
  }
    } catch (error) {
      console.error('Error checking login:', error);
      navigate('/login'); 
    }
  };
  useEffect(()=>{
    checkLogin();
  
  },[navigate])

  return (
    <div>
      <Nav/>
      <div className="bodydiv">
      <div className="form-container">
        <h2>Edit Student Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url"><FaGlobe /> Website URL</label>
            <input
              type="url"
              id="url"
              name="url"
              placeholder="https://example.com"
              value={input.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name"><FaUser /> Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope /> Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={input.email}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
   </div>
  );
}

export default Edit;
