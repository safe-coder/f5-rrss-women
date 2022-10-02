import React, { useState } from "react";
import "../../styles/PostCard.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const PostCardBody = ({ pos }) => {
  const [readMore, setreadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const shownextimage = (nextimage) => {
    if (currentImage < nextimage.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const showprevimage = (previmage) => {
    if (currentImage > 0 && currentImage <= previmage.length - 1) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <div
      className="postcardbody"
      style={{ margin: "1rem 0", padding: "1rem 0" }}
    >
      <div className="postcardbodycontent">
        {pos && pos.content?.length < 60
          ? pos.content
          : readMore
          ? pos.content + "..."
          : pos.content?.slice(0, 60) + "..... "}
        <span>
          {pos.content?.length > 60 && (
            <span
              style={{ color: "#240046", cursor: "pointer" }}
              onClick={() => setreadMore(!readMore)}
            >
              {readMore ? "Ocultar " : "Mostrar "}
            </span>
          )}
        </span>
      </div>

      {pos.images?.length > 0 &&
        pos.images?.map(
          (image, index) =>
            index === currentImage && (
              <div className="postcardbodyimages" key={index}>
                <span
                  className="postcardbodyimagenext"
                  onClick={() => shownextimage(pos.images)}
                >
                  {" "}
                  <KeyboardDoubleArrowRightIcon fontSize="large" />
                </span>
                <span
                  className="postcardbodyimageprev"
                  onClick={() => showprevimage(pos.images)}
                >
                  {" "}
                  <KeyboardDoubleArrowLeftIcon fontSize="large" />{" "}
                </span>

                {<img src={image.secure_url} alt={pos.user?.fullname} />}
              </div>
            )
        )}
    </div>
  );
};

export default PostCardBody;
