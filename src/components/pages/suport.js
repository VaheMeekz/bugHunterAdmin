import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { getSuportThunk } from "../../redux/actions/usersAction";
import { Button, Container, Table, Form } from "react-bootstrap";
import del from "../../assets/images/delete.svg";
import send from "../../assets/images/send-fill.svg";
import SuportSendModal from "./modals/SuportSendModal";
import axios from "axios";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";

const Suport = () => {
  const alert  = useAlert()
  const dipatch = useDispatch();
  const suporteds = useSelector((state) => state.UsersReducer.suport);
  const [allSuports, setAllSuports] = useState();
  const [showModal, setShowModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    dipatch(getSuportThunk());
  }, []);

  useEffect(() => {
    setAllSuports(suporteds);
  }, [suporteds]);

  const handlerDelateSup = (id) => {
    axios
      .post(`${baseUrl}/suport/del`, {
        id,
      })
      .then(function (response) {
        setAllSuports(response.data);
        alert.success("Message are Deleate!")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Card className="d-flex justify-content-around">
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Suport</h2>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Send Message</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {allSuports &&
              allSuports.map((u, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.message}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowModal(true);
                          setCurrentEmail(u.email);
                        }}
                      >
                        <img src={send} alt="send" />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handlerDelateSup(u.id)}
                      >
                        <img src={del} alt="delate" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            <SuportSendModal
              show={showModal}
              onHide={() => setShowModal(false)}
              email={currentEmail}
            />
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Suport;
