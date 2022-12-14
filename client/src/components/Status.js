import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import "../styles/Status.css";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PhotoIcon from "@mui/icons-material/Photo";
import { useDispatch } from "react-redux";
import { createpost, updatepost } from "../redux/actions/postActions";
import { ALERT_TYPES } from "../redux/actions/alertActions";

const Status = () => {
  const { auth, status, socket } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (status.edit) {
      setContent(status.Content);
      setImages(status.images);
    }
  }, [status]);

  const uploadimages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let imagesArr = [];

    files.forEach((file) => {
      if (!file) return (err = "no file found");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "invalid format");

      return imagesArr.push(file);
    });

    if (err) dispatchEvent({ type: "ALERT", payload: { error: err } });
    setImages([...images, ...imagesArr]);
    console.log(images);
  };

  const deleteimage = (inde) => {
    const newArrimage = [...images];
    newArrimage.splice(inde, 1);
    setImages(newArrimage);
  };

  const handleuploadinput = () => {
    const imageuploadfunc = document.getElementById("postupload");
    imageuploadfunc.click();
  };

  const handleStreamStop = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status.edit) {
      dispatch(updatepost({ content, images, auth, status, socket }));
      dispatch({ type: ALERT_TYPES.STATUS, payload: { edit: false } });
    } else {
      dispatch(createpost({ content, images, auth, socket }));
      setContent("");
      setImages([]);
      if (tracks) tracks.stop();
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: ALERT_TYPES.STATUS, payload: { edit: false } });
  };

  return (
    <div className={status.edit ? "editstatus" : "status"}>
      <form onSubmit={handleSubmit}>
        <div className="status-header"></div>
        <div className="status-middle">
          <textarea
            type="text"
            placeholder="??Comp??rtelo con nosotras!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            cols="10"
          />
          <small>{content?.length}</small>
        </div>
        <div className="status-imagesdiv">
          {images &&
            images.map((image, index) => (
              <div className="status-middleimagecontainer">
                <img
                  className="status-middleimages"
                  src={
                    image.camera
                      ? image.camera
                      : image.secure_url
                      ? image.secure_url
                      : URL.createObjectURL(image)
                  }
                  alt=""
                />
                <span
                  className="status-middleimagedelete"
                  onClick={() => deleteimage(index)}
                >
                  <CancelRoundedIcon fontSize="large" />
                </span>
              </div>
            ))}
        </div>
        {stream && (
          <div className="status-stream">
            <span
              className="status-middlestreamstop"
              onClick={handleStreamStop}
            >
              x
            </span>
          </div>
        )}

        <div className="status-footer">
          <div className="status-footerright">
            {stream ? (
              <PhotoIcon />
            ) : (
              <>
                <PhotoIcon
                  onClick={handleuploadinput}
                  style={{ color: "#240046", cursor: "pointer" }}
                />
              </>
            )}
            <span>
              <input
                style={{ display: "none" }}
                type="file"
                id="postupload"
                onChange={uploadimages}
                multiple
                accept="image/*"
              />
            </span>
          </div>
          <div className="status-footerleft">
            <button
              className="status-footerleftdiscard"
              onClick={handleDiscard}
            >
              Borrar
            </button>
            <button className="status-footerleftcreate" type="submit">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Status;
