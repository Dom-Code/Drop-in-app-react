import React from 'react';
import './App.css';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom'; 
import VerifiedMain from './components/verifiedUser/VerifiedMain';

function App() {
  return (
    <Routes>
      <Route path='/Drop-in-app-react' element={<Main/>}/>
      <Route path='/Drop-in-app-react/user' element={<VerifiedMain/>}/>
    </Routes>
  );
}

// App has 2 routes. 
// Main -> user that is not logged in.
// VerifiedMain -> signed in user.

export default App;
