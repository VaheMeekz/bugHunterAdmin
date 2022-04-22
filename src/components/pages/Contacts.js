import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  FormControl,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getContactThunk } from "../../redux/actions/contactAction";
import { Button } from "react-bootstrap";
import ContactMailModal from "./modals/ContactsMailModal";
import chat from "../../assets/images/chat.svg";
import search from "../../assets/images/search.svg";
import delate from "../../assets/images/delete.svg";
import axios from "axios";
import { makeArray } from "../../assets/helpers/helpers";
import { baseUrl } from "../../config";

const Contacts = () => {
  const contacts = useSelector((state) => state.ContactsReducer.contacts);
  const limit = useSelector((state) => state.PagesReducer.limit);
  const count = useSelector((state) => state.PagesReducer.count);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchedAllClans, setSearchedAllClans] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(limit);

  const sendDeleate = (id) => {
    if (id) {
      axios
        .post(`${baseUrl}/contact/deleate`, {
          id: id,
        })
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    dispatch(getContactThunk());
  }, []);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / currentLimit)));
    }
  }, [count, currentLimit]);

  useEffect(() => {
    if (contacts) {
      setSearchedAllClans(contacts);
    }
  }, [contacts]);

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Contacts</h2>
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
              // value={searchValue}
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
              <th>Email</th>
              <th>Message</th>
              <th>View</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {searchedAllClans.map(({ email, id, message }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{email}</td>
                  <td>{message}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(true);
                        setCurrentEmail({ email });
                      }}
                    >
                      <img src={chat} alt="message" />
                    </Button>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => sendDeleate(id)}>
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
            <ButtonGroup className="me-2" aria-label="First group">
              {pages.map((s) => {
                return (
                  <div key={s} onClick={() => setPage(s)}>
                    <Button>{s}</Button>
                  </div>
                );
              })}
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Container>
    </div>
  );
};

export default Contacts;
