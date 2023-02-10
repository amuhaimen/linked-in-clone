import React from "react";

const LButton = (props) => {
  return (
    <props.lname onClick={props.click} variant="contained" disableRipple>
      {props.title}
    </props.lname>
  );
};

export default LButton;
