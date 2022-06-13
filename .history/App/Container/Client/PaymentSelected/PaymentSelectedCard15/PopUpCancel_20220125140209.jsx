import React from "react";
import { warning } from "../../../svg/IconSvgClient";
export default function PopUpCancel({
  show,
  title = "Cancelling Transaction...",
  detail = "Please wait for a moment. Kindly remember to collect any remaining cash that has not yet been processed. Please remember to collect your ID",
}) {
  return (
    <div>
      {show && (
        <div className="popup_cancel">
          <div className="blur"></div>
          <div className="popup_cancel-content">
            <div className="title">
              <div className="icon">{warning}</div>
              <div className="text">{title}</div>
            </div>
            <div className="detail">{detail}</div>
          </div>
        </div>
      )}
    </div>
  );
}
