import React from "react";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import "../styles/Status.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PhotoIcon from "@mui/icons-material/Photo";
import { useDispatch } from "react-redux";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false)
  const [tracks, setTracks] = useState("")

  const refVideo = useRef();
  const refCanvas = useRef();

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
    //esto da problemas
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

  const handleStream = () =>{
    setStream(true)
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:true})
        .then((stream =>{
            refVideo.current.srcObject = stream;
            refVideo.current.play();
            const track = stream.getTracks();
            
            setTracks(track[0])

            
            
        })).catch(err => console.log(err))
    }
}

  return (
    <div className="status">
      <form>
        <div className="status-header">
          <img src={auth.user.avatar} alt="" />
          <h4>@{auth.user.username}</h4>
        </div>
        <div className="status-middle">
          <textarea
            type="text"
            placeholder="¡Compártelo con nosotras!"
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
                  src={URL.createObjectURL(image)}
                  alt=""
                />
                <span
                  className="status-middleimagedelete"
                  onClick={() => deleteimage(index)}
                >
                  x
                </span>
              </div>
            ))}
        </div>
{
    stream && <div className="status-stream">
        <video autoPlay muted ref={refVideo} style={{height: "100%", width: "100%"}}/>
        <span>x</span>
        <canvas ref={refCanvas}/>
    </div>
}

        <div className="status-footer">
          <div className="status-footerright">
            <PhotoCameraIcon onClick={handleStream}/>
            <PhotoIcon onClick={handleuploadinput} />
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
            <button className="status-footerleftdiscard">Descartar</button>
            <button className="status-footerleftcreate">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Status;
