import React from "react";
import "../styles/Header.css";
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../redux/actions/authActions";
import {Link, useLocation} from "react-router-dom";

export const Header = () =>{
    const dispatch = useDispatch();
    const {auth} = useSelector(state=>state);
    const {pathname} = useLocation();

    const isActive = (pn) =>{
        if(pn === pathname) return 'active'
    }

    return (
        <div className="header">
            <div className="header-right">
                <h3>Safe Coders</h3>
            </div>
            <div className="header-center">
                <input type="text" placeholder="Search Profiles"/>
                <SearchIcon/>
            </div>
            <div className="header-left">
                <div className="header-leftAvatar">
                    <Avatar src={auth.user.avatar}/>
                    <h4>{auth.user.fullname}</h4>
                </div>
                <Link to="/">
                <IconButton>
                    <HomeIcon className={`${isActive('/')}`}/>
                </IconButton>
                </Link>
                <Link to="/message">
                <IconButton>
                    <MessageIcon className={`${isActive('/message')}`}/>
                </IconButton>
                </Link>
                <Link to="/notification">
                <IconButton>
                    <NotificationsIcon className={`${isActive('/notification')}`}/>
                </IconButton>
                </Link>
                <Link to="/explore">
                <IconButton>
                    <ExploreIcon className={`${isActive('/explore')}`}/>
                </IconButton>
                </Link>
                <IconButton onClick={()=>dispatch(logout)}>
                    <ExitToAppIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header;