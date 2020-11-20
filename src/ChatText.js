import * as PropTypes from "prop-types";
import React from "react";

export function ChatText(props) {
  return <div className={props.classes.messagesContainer}>
    <div className={props.classes.messagesWrapper}>
      {props.messages.map(props.callbackfn)}
    </div>
  </div>;
}

ChatText.propTypes = {
  classes: PropTypes.any,
  messages: PropTypes.any,
  callbackfn: PropTypes.func
};
