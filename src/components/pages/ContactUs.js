import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Container,
  FormControl,
  Table,
} from "react-bootstrap";
import search from "../../assets/images/search.svg";
import chat from "../../assets/images/chat.svg";
import delate from "../../assets/images/delete.svg";
import ContactMailModal from "./modals/ContactsMailModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getContactUsThunk } from "../../redux/actions/contactUsActiion";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";


const ContactUs = () => {
  const alert = useAlert();
  const contacts = useSelector((state) => state?.ContactUsReducer.allContacts);
  const [allContactUs, setAllCountactUs] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchedAllClans, setSearchedAllClans] = useState([]);
  useEffect(() => {
    dispatch(getContactUsThunk());
  }, []);

  useEffect(() => {
    if (allContactUs) {
      setSearchedAllClans(contacts);
    }
  }, [contacts]);

  const sendDeleate = (id) => {
    if (id) {
      axios
        .post(`${baseUrl}/contactus/deleate`, {
          id: id,
        })
        .then(function (response) {
          console.log(response.data, "response.dataresponse.dataresponse.data");
          setSearchedAllClans(response.data);
          alert.success("Deleted!");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Contact Us</h2>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body className="d-flex ">
          <h4>
            <img src={search} alt="search" />
          </h4>
          <div width={"200px"} style={{ marginLeft: "10px" }}>
            <FormControl
              placeholder="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                const searchedClans = contacts.filter((p) => {
                  return p.email
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                });
                setSearchedAllClans(searchedClans);
                searchValue(e.target.value);
              }}
            />
          </div>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>View</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {searchedAllClans.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.subject}</td>
                  <td>{item.message}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(true);
                        setCurrentEmail({ item });
                      }}
                    >
                      <img src={chat} alt="message" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => sendDeleate(item.id)}
                    >
                      <img src={delate} alt="delate" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ContactMailModal
          show={showModal}
          onHide={() => setShowModal(false)}
          email={currentEmail}
        />
        <Card.Body className="d-flex justify-content-center">
          <ButtonToolbar aria-label="Toolbar with button groups">
            {/* <ButtonGroup className="me-2" aria-label="First group">
              {pages.map((s) => {
                return (
                  <div key={s} onClick={() => setPage(s)}>
                    <Button>{s}</Button>
                  </div>
                );
              })}
            </ButtonGroup> */}
          </ButtonToolbar>
        </Card.Body>
      </Container>{" "}
    </div>
  );
};

export default ContactUs;
