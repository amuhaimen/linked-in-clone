import React, { useState } from "react";
import { Header } from "../components/Header";
import Heading from "../components/Heading";
import { BsLinkedin } from "react-icons/bs";
import InputBox from "../components/InputBox";
import LButton from "../components/LButton";
import AuthenticationLink from "../components/AuthenticationLink";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CommonButton = styled(Button)({
  backgroundColor: "#086FA4",
  padding: "19px",
  borderRadius: "86px",
  fontFamily: "Nunito",
  fontSize: "20.64px",
  fontWeight: 500,
  marginTop: "51px",
  "&:hover": {
    backgroundColor: "#0069d9",
  },
});

const Login = () => {
  let [show, setShow] = useState(false);
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState({
    email: "",
    password: "",
  });

  let handleForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  let handleClick = () => {
    if (formData.email == "") {
      setError({ ...error, email: "Email Required" });
    } else if (formData.password == "") {
      setError({ ...error, password: "password required" });
    }
  };

  return (
    <div className="container">
      <div className="logoicon">
        <BsLinkedin className="one" />
      </div>
      <Header>
        <Heading className="heading" title="Login" as="h2" />
        <p className="regsubheading">Free register and you can enjoy it</p>
      </Header>
      <div className="inputboxcontainer">
        <InputBox
          name="email"
          textChange={handleForm}
          type="text"
          label="Email"
          variant="outlined"
          className="reginput"
        />
        {error.email && (
          <Alert className="error" variant="filled" severity="error">
            {error.email}
          </Alert>
        )}
        <div style={{ position: "relative" }}>
          <InputBox
            textChange={handleForm}
            name="password"
            type={show ? "text" : "password"}
            label="Password"
            variant="outlined"
            className="reginput"
          />
          {show ? (
            <AiFillEye className="eyeicon" onClick={() => setShow(false)} />
          ) : (
            <AiFillEyeInvisible
              className="eyeicon"
              onClick={() => setShow(true)}
            />
          )}
        </div>
        {error.password && (
          <Alert className="error" variant="filled" severity="error">
            {error.password}
          </Alert>
        )}
        <LButton click={handleClick} lname={CommonButton} title="Sign in" />
        <AuthenticationLink
          className="reglink"
          title="you don't have account"
          href="/"
          hreftitle="Sign Up"
        />
      </div>
    </div>
  );
};

export default Login;
