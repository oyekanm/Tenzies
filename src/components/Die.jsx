import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div onClick={props.handleClick} className="Tenzie__span" style={styles}>
      <p className="Tenzie--num">{props.value}</p>
    </div>
  );
}

export default Die;
