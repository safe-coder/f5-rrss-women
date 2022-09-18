import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "../components/UserCard";
import LoadIcon from "../images/loading.gif";
import LogoSC from "../images/LOGOSC.png"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import "../styles/Header.css";

function Navbar() {

    //responsive
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">My work</a>
				<a href="/#">Blog</a>
				<a href="/#">About me</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<CloseIcon />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<MenuIcon />
			</button>
		</header>
	);
}

export default Navbar;