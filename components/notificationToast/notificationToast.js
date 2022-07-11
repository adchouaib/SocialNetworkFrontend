import React , {useState} from "react";

import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";

function NotificationToast() {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small className="text-muted">just now</small>
      </Toast.Header>
      <Toast.Body>See? Just like this.</Toast.Body>
    </Toast>
  );
}

export default NotificationToast;
