import React, { useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEmail } from "../../../redux/actions/subscribersAction";
import axios from 'axios'
function SubscribersModal(props) {
  const dispatch = useDispatch();
  const messageSendEmails = useSelector(
    (state) => state?.SubscribersReducer.subscribers
  );
  
  const [messageText, setMessageText] = useState("");

  const dispatchMessage = () => {
    dispatch(getEmail(messageText({})));
    setMessageText("");
  };

  if(messageText !== ''){
  axios.post('`${baseUrl}/suport/sendEmail', {
    emails: messageSendEmails.email,
    lastName: messageText
  })
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error);
  });
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
         Email Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Send Message</h4>
        <FloatingLabel controlId="floatingTextarea2" label="Message">
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatchMessage()}>Send</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SubscribersModal;
