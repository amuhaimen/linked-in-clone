import React from "react";
import { Link } from "react-router-dom";

const AuthenticationLink = ({ title, className, href, hreftitle }) => {
  return (
    <p className={className}>
      {title}
      <Link to={href}>{hreftitle}</Link>
    </p>
  );
};

export default AuthenticationLink;
