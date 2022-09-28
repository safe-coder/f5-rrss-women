import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/profileActions.js";
import "../styles/EditProfile.css";
import { checkimage } from "../utils/imageupload.js";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const EditProfile = ({ user, setOnEdit }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initState = {
    website: "",
    fullname: "",
    story: "",
    address: "",
    password: "",
  };
  const [editData, setEditData] = useState(initState);
  const { website, fullname, story, address, password } = editData;
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [showcfpass, setShowcfpass] = useState(false);

  const changeavatar = (e) => {
    const file = e.target.files[0];
    const err = checkimage(file);
    if (err) return dispatch({ type: "ALERT", payload: { error: err } });
    setAvatar(file);
  };

  const changebanner = (e) => {
    const file = e.target.files[0];
    const err = checkimage(file);
    if (err) return dispatch({ type: "ALERT", payload: { error: err } });
    setBanner(file);
  };

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const selectUploadAvatar = () => {
    const fileuploadinput = document.getElementById("file-upload-avatar");
    fileuploadinput.click();
  };

  const selectUploadBanner = () => {
    const fileuploadinput = document.getElementById("file-upload-banner");
    fileuploadinput.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ editData, avatar, banner, auth, password }));
  };

  return (
    <div className="editprofile">
      <div className="editprofile-content">
        <div className="editprofile-head">
          <h4 className="editprofile-headetitle">Editar Perfil</h4>
          <button
            className="editprofile-headclose"
            onClick={() => setOnEdit(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="editimg-content">
          <div className="editprofile-avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt=""
            />
            <i className="fas fa-camera" onClick={selectUploadAvatar}>
              <p className="editprofile-userdatapara">Editar Avatar</p>
            </i>
            <span>
              <input
                style={{ display: "none" }}
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
              <p className="editprofile-userdatapara">Editar Banner</p>
            </i>
            <span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file-upload-banner"
                accept="image/*"
                onChange={changebanner}
              />
            </span>
          </div>
        </div>
        <div className="editprofile-userdata">
          <label htmlFor="fullname">Nombre </label>
          <div className="editprofile-userdatafullname">
            <input
              type="text"
              value={fullname}
              onChange={handleChangeInput}
              name="fullname"
              placeholder="Escribe tu nombre"
            />
            <p>{fullname.length}/25</p>
          </div>

          <label htmlFor="address">Ubicación</label>
          <div className="editprofile-userdataaddress">
            <input
              type="text"
              value={address}
              onChange={handleChangeInput}
              name="address"
              placeholder="Escribe tu Ubicación"
            />
          </div>

          <label htmlFor="website">Github </label>
          <div className="editprofile-userdatawebsite">
            <input
              type="text"
              value={website}
              onChange={handleChangeInput}
              name="website"
              placeholder="Escribe tu web"
            />
          </div>

          <label htmlFor="story">Sobre mi </label>
          <div className="editprofile-userdatastory">
            <input
              type="text"
              value={story}
              onChange={handleChangeInput}
              name="story"
              placeholder="Escribe tu Bio"
            />
            <p>{story.length}/200</p>
          </div>
          <label htmlFor="password">Contraseña </label>
          <div className="editprofile-userdatastory">
            <input
              type={showcfpass ? "hide" : "password"}
              value={password}
              onChange={handleChangeInput}
              name="password"
              placeholder="Escribe tu Password"
            />
             <small
            
            onClick={() => setShowcfpass(!showcfpass)}
          >
            {showcfpass ?  <RemoveRedEyeIcon/> : <VisibilityOffIcon/>}
          </small>
          </div>
          <button onClick={handleSubmit} className="editprofile-userdatabutton">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
