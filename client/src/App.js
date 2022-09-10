
import './App.css';
import './index.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import Header from './components/Header';
import {useSelector, useDispatch} from 'react-redux';
import Home from './pages/Home';
import Header from './components/Header';
import { useEffect } from "react";
import { refreshToken } from './redux/actions/authActions';


function App() {
  const {auth} = useSelector(state =>state);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(refreshToken())
   
   
  }
,[dispatch]
)


  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Alert />
          <Header/>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            {auth.token ? ( <Route exact path="/" element={<Home/>}/>) :(<Route exact path="/" element={<Login/>} />) }
           
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
