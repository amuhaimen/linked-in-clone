import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";

const Home = () => {
  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo);

  useEffect(() => {
    if (!data.userdata.userInfo) {
      navigate("/login");
    }
  }, []);
  let handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo");
      dispatch(activeUser(null));
      navigate("/login");
    });
  };

  useEffect(() => {
    document.addEventListener("submit", detectKeyDown, true);
  }, []);

  let detectKeyDown = (e) => {
    console.log("klicked key:", e.key);
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
