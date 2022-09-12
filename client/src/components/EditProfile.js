import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateProfile } from '../redux/actions/profileActions';
 import "../styles/EditProfile.css";
// import {checkimage} from "../utils/imageupload"

const EditProfile = ({ user, setOnEdit }) => {
  const { auth } = useSelector((state) => state);
  const initState = {
    website: "",
    fullname: "",
    story: "",
    phone: "",
    address: "",
  };
  const [editData, setEditData] = useState(initState);
  const { website, fullname, story, phone, address } = editData;
  const [avatar, setAvatar] = useState("");

  const changeavatar = () => {

  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditData({...editData, [name]:value})
  }

  return (
    <div className="editprofile" >
       <div className="editprofile-content">
      <div className="editprofile-head">
        <h4 className="editprofile-headetitle">Edite su perfil</h4>
        <button
          className="editprofile-headclose"
          onClick={() => setOnEdit(false)}
        >
         X
        </button>
      </div>
      <div className="editprofile-avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          alt=""
        />
        <i className="fas fa-camera">
          <p className="editprofile-userdatapara">Change Pic</p></i>
        <span>
          <input
            style={{display:'none'}}
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={changeavatar}
          />
        </span>
      </div>
      <div className="editprofile-userdata">
        <label htmlFor="fullname">Nombre completo </label>
        <div className="editprofile-userdatafullname">
          <input
            type="text"
            value={fullname}
            onChange={handleChangeInput}
            name="fullname"
            placeholder="Type your name"
          />
          <p>{ fullname.length}/25</p>
        </div>
        
        <label htmlFor="address">Direccion </label>
        <div className="editprofile-userdataaddress">
          <input
            type="text"
            value={address}
            onChange={handleChangeInput}
            name="address"
            placeholder="Type your address"
          />
         
       </div>

       <label htmlFor="website">Sitio WEb </label>
        <div className="editprofile-userdatawebsite">
          <input
            type="text"
            value={website}
            onChange={handleChangeInput}
            name="website"
            placeholder="Type your website name"
          />
          </div>
        
          <label htmlFor="phone">Telefono </label>
        <div className="editprofile-userdataphone">
          <input
            type="text"
            value={phone}
            onChange={handleChangeInput}
            name="phone"
            placeholder="Type your phone number"
          />
          
        </div>
        
        <label htmlFor="story">Sobre mi </label>
        <div className="editprofile-userdatastory">
          <input
            type="text"
            value={story}
            onChange={handleChangeInput}
            name="story"
            placeholder="Type your Bio"
          />
          <p>{ story.length}/200</p>
          </div>

          </div>
      </div>
    </div>
  );
};

export default EditProfile;
