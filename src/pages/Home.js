import React, { useEffect, useState } from "react";
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
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const Home = () => {
  let [text, setText] = useState("");
  let [status, setStatus] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo);

  //upload post start
  let handleSubmit = () => {
    set(push(ref(db, "status")), {
      post: text,
    }).then(() => {
      setText("");
    });
  };

  let handletext = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const todoRef = ref(db, "status");
    onValue(todoRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setStatus(arr);
    });
  }, []);
  //upload post end

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

  let handleprofile = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="topbar"></div>
      <div className="bg-color">
        <div className="newsfeed-container">
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <div className="postbox">
                <div>
                  <h3 className="title">New post</h3>
                  <input
                    onChange={handletext}
                    className="newsfeed-input"
                    placeholder="What's on your mind"
                  />
                </div>
                <div className="iconholder">
                  <AiOutlinePicture className="pic-icon" />
                  <TbSend onClick={handleSubmit} className="send-icon" />
                </div>
              </div>
              <div className="post">
                {status.map((item) => (
                  <MUICard
                    posterimgsrc="./assets/profilepic.png"
                    postimgsrc="./assets/cardimg.jpg"
                    postername="S.M Muhaimen"
                    postertitle="@smmuhaimen"
                    posttitle="Food"
                    postdescription={item.post}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div onClick={handleprofile} className="profile-link">
                <div className="show-cover-pic">
                  <img src="./assets/cover-pic-1.png" />
                </div>
                <div className="show-profile-pic"></div>
                <div className="info">
                  <h4>Dmitry Kargaev</h4>
                  <p>
                    a;otujseorituseiorfgtuskdfjgkl xzddfjgklxzjdgklxdfjgikxdhi
                  </p>
                </div>
              </div>
            </Grid>
            <button onClick={handleLogout}>Logout</button>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;
