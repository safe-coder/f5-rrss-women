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

const handlecameraimage = () =>{
    const width = refVideo.current.clientWidth;
    const height = refVideo.current.clientWidth;

    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);
    const ctx = refCanvas.current.getContext('2d');
    ctx.drawImage(refVideo.current, 0, 0, width, height)
    const URL = refCanvas.current.toDataURL();
    setImages([...images, {camera:URL}])
}

const handleStreamStop = () =>{
    tracks.stop();
    setStream(false)
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
                  src={image.camera ? image.camera : URL.createObjectURL(image)}
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
        <video autoPlay muted ref={refVideo} style={{height: "250px", width: "100%", border: "2px solid gray", padding: "3px", borderRadius: "4px"}}/>
        <span className="status-middlestreamstop" onClick={handleStreamStop}>x</span>
        <canvas ref={refCanvas} style={{display: "none"}}/>
    </div>
}

        <div className="status-footer">
            <div className="status-footerright">
            {
                stream ? <PhotoIcon onClick={handlecameraimage} />
                :
                <>
            <PhotoCameraIcon onClick={handleStream}/>
            <PhotoIcon onClick={handleuploadinput} />
            </>
            }
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
