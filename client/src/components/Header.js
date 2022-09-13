import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "../components/UserCard";
import LoadIcon from "../images/loading.gif";
import LogoSC from "../images/LOGOSC.png"


export const Header = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { pathname } = useNavigate();
  const [load,setLoad] = useState(false)

  // useEffect(() => {
  //   if (search ) {
  //     getDataApi(`search?username=${search}`)
  //       .then((res) => setUsers(res.data.users))
  //       //  .then((res) => console.log(res.data.users))
  //       .catch((err) => {
  //         dispatch({
  //           type: "ALERT",
  //           payload: {
  //             error: err.response.data.msg,
  //           },
  //         });
  //       });
  //   } else {
  //           setUsers([])
  //        }
  // }, [search,dispatch]);

   const isActive = (pn) => {
    if (pn === pathname) return "active";
   };

  const handleClose = () => {
    setSearch('');
    setUsers([]);
 } 

 const handleSearch = async (e) =>{
  e.preventDefault();
  if(!search) return;

  try {
     setLoad(true)
     const res = await getDataApi(`search?username=${search}`,auth.token);
     setUsers(res.data.users)
     setLoad(false)
  } catch (err) {
     dispatch({
        type:'ALERT',
        payload:{
           error: err.response.data.msg
        }
     })
  }
  
}

  return (
    <div className="header">
      <div className="header-right">
        <img src={LogoSC} width="140rem" alt="" style={{paddingLeft: "1.3rem"}}/>
      </div>
      <form className="header-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar perfiles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon  style={{opacity: users.length > 0 ? '0' : '1'}} />
        <span className="header-centersearchclose" onClick={handleClose} style={{opacity: users.length > 0 ? '1' : '0'}}>&times;</span>
        <button type="submit" style={{display:'none'}}>Search</button>
        <div className="header-searchusers">
        {load && <img src={LoadIcon} alt="" style={{width:'48px', height:"48px"}}/>}
      {
        search && users.length > 0 && users.map((user) =>(
            <Link to={`profile/${user._id}`} key={user}>
            <UserCard user={user}  key={user}  handleClose={handleClose}/>
            </Link>
        ))
      }
      </div>
      </form>
      
      <div className="header-left">
        <Link to={`profile/${auth.user._id}`}>
          <div className="header-leftAvatar">
            <Avatar src={auth.user.avatar} />
            <h4 style={{color:'#FF9E00'}}>{auth.user.fullname}</h4>
          </div>
        </Link>

        <Link to="/">
          <IconButton>
            <HomeIcon className={`${isActive("/")}`} style={{color:"#FF9E00"}}/>
          </IconButton>
        </Link>

        <Link to="/message">
          <IconButton>
            <MessageIcon className={`${isActive("/message")}`}  style={{color:"#FF9E00"}}/>
          </IconButton>
        </Link>
        <Link to="/notification">
          <IconButton>
            <NotificationsIcon className={`${isActive("/notification")}`}  style={{color:"#FF9E00"}}/>
          </IconButton>
        </Link>
        <Link to="/explore">
          <IconButton>
            <ExploreIcon className={`${isActive("/explore")}`} style={{color:"#FF9E00"}} />
          </IconButton>
        </Link>

        <IconButton onClick={() => dispatch(logout())}  style={{color:"#FF9E00"}} >
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;