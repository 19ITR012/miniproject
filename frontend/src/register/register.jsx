import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jinbg from './jinbg.png'
import './register.css';

const navigate = useNavigate();

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
  
    if (password !== reenteredPassword) {
      setPasswordMatchError(true);
      return;
    }
  
    // Regular expression to validate the password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 symbol.');
      return;
    }
  
    // Regular expression to validate the email address
    const emailRegex = /@jmangroup\.com$/;
  
    if (!emailRegex.test(email)) {
      alert('Email must be from @jmangroup.com domain.');
      return;
    }
  
    try {
      debugger
      console.log(username,email)
      const response = await axios.post('http://localhost:4000/user/register', {
        username,
        email,
        password,
      });
      console.log('Registration response:', response.data);
  
      console.log('Registration Details:');
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
  
      setUsername('');
      setEmail('');
      setPassword('');
      setReenteredPassword('');
      setPasswordMatchError(false);

      navigate('/login');
      alert('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };
  
  
  return (
    <div className='main'> 
    {/* <img src={jinbg}/> */}
    <div className='container'>
      <h2>Registration Form</h2>
      <form onSubmit={handleRegistration}>
      <div>
          <input
          className='input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter User Name'
            required
          />
        </div>

        <div>
          <input
          className='input'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter User Email Id'
            required
          />
        </div>

        <div>
          <input
          className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />
        </div>

        <div>
          <input
            type="password"
            className='input'
            value={reenteredPassword}
            onChange={(e) => setReenteredPassword(e.target.value)}
            placeholder='Enter Confirm Password'
            required
          />
          {passwordMatchError && <p>Passwords do not match.</p>}
        </div>

        <div className='btn'>
        <Link to='/'>
            <button type="button">Back</button>
        </Link>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Register;
