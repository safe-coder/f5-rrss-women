
import './App.css';
import './index.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './pages/Admin';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import Header from './components/Header';
import {useSelector, useDispatch} from 'react-redux';
import Home from './pages/Home';
import { useEffect } from "react";
import { refreshToken } from './redux/actions/authActions';
//import Messages from './pages/Messages';
import Explore from './pages/Explore';
//import Notification from './pages/Notification';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './pages/Profile';
import { getPost } from './redux/actions/postActions.js';
import {getPosts} from './redux/actions/postallActions'
//import { getNotify } from './redux/actions/notifyActions.js';
import io from 'socket.io-client';
import { ALERT_TYPES } from './redux/actions/alertActions';
import SocketioClient from './SocketioClient';

function App() {
  const {auth} = useSelector(state =>state);
  const dispatch = useDispatch();
  //const login = localStorage.getItem('login');

  useEffect(()=>{
    dispatch(refreshToken())
   const socket = io()
    dispatch({ type: ALERT_TYPES.SOCKET, payload: socket })
    return () => socket.close();
  }
,[dispatch]
)

useEffect(()=>{
  if (auth.token) {
    dispatch(getPosts(auth.token))
  dispatch(getPost(auth.token))
 // dispatch(getNotify(auth))
  }
},[auth.token,  dispatch])


  return (
    <>
      <BrowserRouter>
        <div className="App">
            <Alert/>
          {auth.token && <Header />}
          {auth.token && <SocketioClient/> }
          <Routes>
            <Route  path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
            <Route exact path="/" element={auth.token? <Home/> : <Login />} />
            <Route  path="/login" element={<Login />} />

          
            {/* <Route path="/message/*" element={<PrivateRoute><Messages/></PrivateRoute>}/> */}
            {/* <Route  path="/explore/*" element={<PrivateRoute><Explore/></PrivateRoute>} />
            <Route path="/notification/*" element={<PrivateRoute><Notification /></PrivateRoute>} /> */}
         
           <Route path="/post/:id" element={<PrivateRoute><Post /></PrivateRoute>} />
          
            <Route  path="/profile/:id/" element={<PrivateRoute><Profile/></PrivateRoute>} />
         
            
            <Route path='*' element={<NotFound/>}/>
              
            
      </Routes>
      </div>
      </BrowserRouter>
      </>
  );
}

export default App;