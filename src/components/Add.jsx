import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaGlobe, FaUser, FaGraduationCap, FaEnvelope, FaLock } from "react-icons/fa";
import { FeactData, AddData } from '../feature/Creteslice'; // Ensure AddData is imported
import './Add.css';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
function Add() {
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

  const { StudentLmsData } = useSelector((state) => state.StudentLmsData);
  console.log(StudentLmsData);

  useEffect(() => {
    dispatch(FeactData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddData(input));
    setInput({
      id: nanoid(),
      url: '',
      name: '',
        std: '',
      email: '',
      password: '',
    });
    navigate('/view', {state : "Add"}); 
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
      nav('/login');
    } else {
      navigate('/add');
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
        <h2>Add Student Data</h2>
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
            <label htmlFor="std"><FaGraduationCap /> Class</label>
            <input
              type="number"
              id="std"
              name="std"
              placeholder="Your class"
              value={input.std}
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
            Submit
          </button>
        </form>
      </div>
    </div>
   </div>
  );
}

export default Add;
