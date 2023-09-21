import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Jinimg from './jin.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data,setData]=useState([])

  const navigate = useNavigate();

  async function handleSubmit() {
    const userdetails = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:4000/login", { userdetails });
    
      if (response.status === 200) {
        const { userData } = response.data; 
        const { UserId, UserName, IsAdmin } = userData; 
        console.log("sds",IsAdmin);
        
        console.log("UserId:", UserId);
        console.log("UserName:", UserName);
        
        Cookies.set('username', UserName);
        Cookies.set('userID', UserId);
        
        if (IsAdmin) {
          navigate("/Admin");
        } else {
          navigate("/Skill");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("Invalid credentials");
    }
  }
    
  return (
    <div className='login-container'>
      <div className='jin-image'>
        <img src={Jinimg} alt='JIN'></img>
      </div>

      <div className='input-container'>
        <h1>Welcome to Jin Portal</h1>
        <br></br>
        <br></br>
        <h2>Login Here</h2>

        <div>
          <div className='image-container'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            /> <br></br>
          </div>

          <div className='image-container'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            /><br></br>
          </div>

          <div className='btn-container'>
            <p>Don't have an Account?</p>
            <Link to='/Register'><button type='button' className='signup-btn'>Sign Up</button></Link>
            <button onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
