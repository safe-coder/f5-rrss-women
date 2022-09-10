
import './App.css';
import './index.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import Home from './pages/Home';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {refreshToken} from './redux/actions/authActions'

function App() {

  
  return (
    <>
      <BrowserRouter>
        <div className="App">
            <Alert/>
          <Routes>
          
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/post/:id" element={<Post />} />
            <Route path='*' element={<NotFound/>}/>
              
            
      </Routes>
      </div>
      </BrowserRouter>
      </>
  );
}

export default App;
