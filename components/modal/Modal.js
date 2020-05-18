import React from "react";
import ReactDOM from "react-dom";
import QrReader from "react-qr-reader";
import { StyleSheet, View, Button } from 'react-native';

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
          <View style={styles.modalBody}modalOverlay />
          <View
            style={styles.modalWrapper}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <Button
                  type="button"
                  style={styles.modalCloseButton}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <Text aria-hidden="true">&times;</Text>
                </Button>
              </View>
              <View style={styles.modalBody}>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
              </View>
            </View>
          </View>
        </React.Fragment>,
        document.body
      )
    : null;
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    z-index: '1040',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    opacity: '0.5',
  },
  modalWrapper: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1050',
    width: '100%',
    height: '100%',
    overflowX: hidden,
    overflowy: auto,
    outline: '0',
  },
  modal: {
    zIndex: '100',
    backround: '#fff',
    position: relative;
    margin: '1.75rem' 'auto',
    borderRadius: '3px',
    maxWidth: '500px',
    padding: '2rem',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.75rem',
  },
  modalBody: {
    overflow: 'hidden',
    borderRadius: 5px,
  },
  modalCloseButton: {
    fontSize: 1.4rem,
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    opacity: 0.3,
    cursor: pointer,
    border: none,
  }
});
export default Modal;
