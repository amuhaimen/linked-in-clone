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
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

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

const Registration = () => {
  const auth = getAuth();
  let [show, setShow] = useState(false);
  let [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  let [error, setError] = useState({
    email: "",
    name: "",
    password: "",
  });

  let handleForm = (e) => {
    let { name, value } = e.target;

    if (name == "password") {
      let capi = /[A-Z]/;
      let lower = /[a-z]/;
      let num = /[0-9]/;
      if (!capi.test(value)) {
        setError({ ...error, password: "one capital latter required" });
        return;
      }
      if (!lower.test(value)) {
        setError({ ...error, password: "one lower latter required" });
        return;
      }
      if (!num.test(value)) {
        setError({ ...error, password: "one number Required" });
        return;
      }
      if (value.length < 8) {
        setError({ ...error, password: "password would be at least 8" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  let handleClick = () => {
    let expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formData.email == "") {
      setError({ ...error, email: "Email Required" });
    } else if (!expression.test(formData.email)) {
      setError({ ...error, email: "valid email required" });
    } else if (formData.name == "") {
      setError({ ...error, name: "Full Name Required" });
    } else if (formData.password == "") {
      setError({ ...error, password: "password Required" });
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("email sent");
          });
        })
        .catch((e) => {
          const errorCode = e.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setError({ ...error, email: "Email Already Exists" });
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="logoicon">
        <BsLinkedin className="one" />
      </div>
      <Header>
        <Heading
          className="heading"
          title="Get started with easily register"
          as="h2"
        />
        <p className="regsubheading">Free register and you can enjoy it</p>
      </Header>
      <div className="inputboxcontainer">
        <InputBox
          textChange={handleForm}
          name="email"
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
        <InputBox
          textChange={handleForm}
          name="name"
          type="text"
          label="Full Name"
          variant="outlined"
          className="reginput"
        />
        {error.name && (
          <Alert className="error" variant="filled" severity="error">
            {error.name}
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
        <LButton click={handleClick} lname={CommonButton} title="Sign Up" />
        <AuthenticationLink
          className="reglink"
          title="Already have an account"
          href="/login"
          hreftitle="Sign in"
        />
      </div>
    </div>
  );
};

export default Registration;
