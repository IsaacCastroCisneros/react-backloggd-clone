import { useState } from 'react';
import {Route,Routes}from 'react-router-dom';
import SignUp from './pages/SignUp';

function App() 
{  
 return (
    <Routes>
      <Route path='/'>
        <Route path='/sign_up' element={<SignUp/>}/>
      </Route>
    </Routes>
 )
}

export default App
