import "./App.css";
import "./index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Alert from "./components/Alert";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authActions";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";
import { getPosts } from "./redux/actions/postallActions";
import io from "socket.io-client";
import { ALERT_TYPES } from "./redux/actions/alertActions";
import SocketioClient from "./SocketioClient";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io("http://localhost:5000");
    dispatch({ type: ALERT_TYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
    }
  }, [auth.token, dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Alert />
          {auth.token && <Header />}
          {auth.token && <SocketioClient />}
          <Routes>
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile/:id/"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
