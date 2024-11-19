import React from "react";

function Square(props) {
   return (
       <button className={props.player} onClick={props.click}>
          {props.player}
       </button>
   );
}

export default Square;