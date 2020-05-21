import React from "react";
import QrReader from "react-qr-reader";
import style from "./Modal.module.css";

const Modal = ({ isShowing, hide, callback }) => {
  const handleScan = (data) => {
    if (data) {
      hide();

      const obj = {
        address: getQrCode(data),
        amount: getAmountFromQrCode(data),
      };

      callback(obj);
    }
  };

  const getQrCode = (content) => {
    var qrCode = content;

    if (qrCode.includes(":")) {
      qrCode = qrCode.substring(qrCode.indexOf(":") + 1);
    }

    if (qrCode.includes("?")) {
      qrCode = qrCode.substring(0, qrCode.indexOf("?"));
    }

    return qrCode;
  };

  const getAmountFromQrCode = (content) => {
    const results = new RegExp("[?&]amount=([^&#]*)").exec(content);
    return results?.length ? results[1] : null;
  };

  const handleError = (err) => {
    console.error(err);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={style["modal-overlay"]} />
          <div
            className={style["modal-wrapper"]}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={style["modal"]}>
              <div className={style["modal-header"]}>
                <button
                  type="button"
                  className={style["modal-close-button"]}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className={style["modal-body"]}>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
