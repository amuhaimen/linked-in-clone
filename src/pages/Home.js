import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import MUICard from "../components/MUICard";
import Grid from "@mui/material/Grid";
//text field start
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputBox from "../components/InputBox";
//text field end

import { AiOutlinePicture } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

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

  return (
    <>
      <div className="topbar"></div>
      <div className="bg-color">
        <div className="newsfeed-container">
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <div className="postbox">
                <h3 className="title">New Post</h3>
                <InputBox
                  className="newsfeedInput"
                  variant="standard"
                  label="What's on your mind"
                />
                <div className="iconholder">
                  <AiOutlinePicture className="pic-icon" />
                  <TbSend className="send-icon" />
                </div>
              </div>
              <div className="post">
                <MUICard
                  posterimgsrc="./assets/profilepic.png"
                  postimgsrc="./assets/cardimg.jpg"
                  postername="S.M Muhaimen"
                  postertitle="@smmuhaimen"
                  posttitle="Food"
                  postdescription="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially"
                />
                <MUICard
                  posterimgsrc="./assets/profilepic.png"
                  postimgsrc="./assets/htmlpic.png"
                  postername="S.M Muhaimen"
                  postertitle="@smmuhaimen"
                  posttitle="HTML"
                  postdescription="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially"
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <h1>Profile Link</h1>
            </Grid>
            <button onClick={handleLogout}>Logout</button>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;
