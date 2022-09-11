import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Info = () => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

//   useEffect(() => {
//     if (id === auth.user._id){
//         setUserData([auth.user])
//     }
//   }, [id, auth]);
//   console.log(userData)
  return (
    <div className="profileinfo">
      <h2>Info-{id}</h2>
    </div>
  );
};

export default Info;
