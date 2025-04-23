import React, { useEffect, useState } from 'react'
import { DeleteData, FeactData } from '../feature/Creteslice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import './view.css'
import axios from 'axios';
import Nav from './Nav';
function View() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


const [filterdata,setfilterdata]=useState([])
  const { StudentLmsData } = useSelector((state) => state.StudentLmsData)
  console.log(StudentLmsData);
  

  console.log(location);
  useEffect(() => {
    dispatch(FeactData())
  }, [location])

  const handleDelete = async (id) => {
    await dispatch(DeleteData(id));
    dispatch(FeactData());
  
    if (filterdata.length > 0) {
      const filterclass = filterdata[0]?.std;
      filterdata1(filterclass);
    }
  };
  
  const filterdata1=(filterclass)=>{

    const filterlmsdata=StudentLmsData.filter((val)=>val.std == filterclass)
console.log(filterdata);

setfilterdata(filterlmsdata)
  }

   const checkLogin = async () => {
            try {
              const res = await axios.get('http://localhost:3000/login');
          console.log(res.data);
          if (res.data.length === 0) {
            navigate('/login');
          } else {
            navigate('/view');
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
      
      <button className="AddButton" onClick={() => navigate('/add')}>
  <FaPlus style={{ marginRight: '8px' }} />
  Add New
</button>

<div className="button-row">
  {[...Array(12)].map((_, i) => (
    <button key={i} onClick={() => filterdata1(i + 1)}>{i + 1}</button>
  ))}
</div>

<div className="card-wrapper">
  {(Array.isArray(filterdata) && filterdata.length > 0 ? filterdata : StudentLmsData || []).map((val, index) => (
    <div key={index} className="card">
      <div className="avatar">
        {val.url ? (
          <img
            src={val.url}
            alt="Website Icon"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/70x70.png?text=🌐";
            }}
          />
        ) : (
          <span className="emoji-icon">🌐</span>
        )}
      </div>

      <div className="card-content">
        <div className="title-row">
          <h3>{val.name}</h3>
          {val.std && <span className="std-tag">Std: {val.std}</span>}
        </div>

        <div className="info-group">
          <div className="info-row"><strong>Email:</strong> {val.email}</div>
          <div className="info-row"><strong>Password:</strong> <code>{val.password}</code></div>
        </div>

        <div className="action-row">
          <button onClick={() => navigate('/edit', { state: val })} className="edit-btn">
            <FaEdit /> Edit
          </button>
          <button onClick={() => handleDelete(val.id)} className="delete-btn">
            <FaTrash /> Delete
          </button>
          {val.url && (
            <a href={val.url} target="_blank" rel="noreferrer" className="visit-btn">
              <FaExternalLinkAlt /> Visit Site
            </a>
          )}
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  )
}

export default View