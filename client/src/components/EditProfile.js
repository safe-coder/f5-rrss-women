import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from '../redux/actions/profileActions.js';
 import "../styles/EditProfile.css";
 import {checkimage} from "../utils/imageupload.js"

const EditProfile = ({ user, setOnEdit }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch()


  const initState = {
    website: "",
    fullname: "",
    story: "",
    address: "",
  };
  const [editData, setEditData] = useState(initState);
  const { website, fullname, story,  address } = editData;
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");


  

  const changeavatar = (e) => {
    const file = e.target.files[0];
    const err = checkimage(file)
    if(err) return dispatch({type:"ALERT", payload:{error: err}})
    setAvatar(file)
  };

  const changebanner = (e) => {
    const file = e.target.files[0];
    const err = checkimage(file)
    if(err) return dispatch({type:"ALERT", payload:{error: err}})
    setBanner(file)
  };

  useEffect(() => {
  setEditData(user)
},[user])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditData({...editData, [name]:value})
  }

  const selectUploadAvatar = () => {
    const fileuploadinput = document.getElementById("file-upload-avatar")
    fileuploadinput.click()
  }

  const selectUploadBanner = () => {
    const fileuploadinput = document.getElementById("file-upload-banner")
    fileuploadinput.click()
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({editData, avatar,banner, auth}))
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
        <i className="fas fa-camera" onClick={selectUploadAvatar}>
          <p className="editprofile-userdatapara">Change Pic</p></i>
        <span>
          <input
            style={{display:'none'}}
            type="file"
            id="file-upload-avatar"
            accept="image/*"
            onChange={changeavatar}
          />
        </span>
      </div>
      <div className="editprofile-avatar">
        <img
          src={banner ? URL.createObjectURL(banner) : auth.user.banner}
          alt=""
        />
        <i className="fas fa-camera" onClick={selectUploadBanner}>
          <p className="editprofile-userdatapara">Change Pic</p></i>
        <span>
          <input
            style={{display:'none'}}
            type="file"
            id="file-upload-banner"
            accept="image/*"
            onChange={changebanner}
          />
        </span>
      </div>
      <div className="editprofile-userdata">
        <label htmlFor="fullname">Nombre </label>
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
        
        <label htmlFor="address">Dirección </label>
        <div className="editprofile-userdataaddress">
          <input
            type="text"
            value={address}
            onChange={handleChangeInput}
            name="address"
            placeholder="Type your address"
          />
         
       </div>

       <label htmlFor="website">Sitio Web </label>
        <div className="editprofile-userdatawebsite">
          <input
            type="text"
            value={website}
            onChange={handleChangeInput}
            name="website"
            placeholder="Type your website name"
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
          <button onClick={handleSubmit} className="editprofile-userdatabutton">Submit</button>

          </div>
      </div>
    </div>
  );
};

export default EditProfile;
