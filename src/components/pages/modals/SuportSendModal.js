import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const SuportSendModal = (props) => {
  const [message, setMessage] = useState("");
  const currentEmail = props.email.email
    const sendAnswer = () => {
    axios.post('`${baseUrl}/suport/sendAnswer', {
      email: currentEmail,
      message: message,
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
      setMessage('')
}

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Send Answer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Message</h4>
        {/* <Form.Control size="lg" type="text" placeholder="Message Title" />
        <br /> */}
        <Form.Control
          as="textarea"
          style={{ height: "100px" }}
          placeholder="message body"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>sendAnswer()}>Send</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuportSendModal;
