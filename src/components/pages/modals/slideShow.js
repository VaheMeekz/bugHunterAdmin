import { Button, Modal } from "react-bootstrap";
import css from "../detail.module.css"

const Slide = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">This Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={css.modalimgBox}>
          <img src={props.currentImage} alt="this" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Slide;
