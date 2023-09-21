
import Register from './register/register';
import Login from'./login/login';
import {Route,Routes } from 'react-router-dom';
import React from 'react';
import Skill from './skill/skill';
import Admin from './skill/admin';


function App() {
  return (
    
     <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Skill' element={<Skill/>}/>
          <Route path='/Admin' element={<Admin/>}/>

        </Routes>
    
  );
}

export default App;
