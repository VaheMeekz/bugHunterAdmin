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
import { getContactThunk } from "../../redux/actions/contactAction";
import { makeArray } from "../../assets/helpers/helpers";
import { getContactUsThunk } from "../../redux/actions/contactUsActiion";
import { getPartnersThunk } from "../../redux/actions/PartnersAction";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";

const Partners = () => {
  const partners = useSelector((state) => state?.PartnersReducer.partners);
  const [allPartners, setAllPartners] = useState([]);
  const limit = useSelector((state) => state?.PagesReducer.limit);
  const count = useSelector((state) => state?.PagesReducer.count);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchedAllClans, setSearchedAllClans] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(limit);
  const alert = useAlert();
  const sendDeleate = (id) => {
    if (id) {
      axios
        .post(`${baseUrl}/parnters/deleate`, {
          id: id,
        })
        .then(function (response) {
          alert.success("Deleted!");
          setSearchedAllClans(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    dispatch(getPartnersThunk());
  }, []);

  // useEffect(() => {
  //   setAllPartners(partners);
  // }, [partners]);

  useEffect(() => {
    if (allPartners) {
      setSearchedAllClans(partners);
    }
  }, [partners]);

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Partners</h2>
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
                const searchedClans = partners.filter((p) => {
                  return p.companyName
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Business Adress</th>
              <th>Number</th>
              <th>Web Site</th>
              <th>Country</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {searchedAllClans.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.companyName}</td>
                  <td>{item.businessAdress}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.webSite}</td>
                  <td>{item.country}</td>
                  <td>{item.subject}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(true);
                        // setCurrentEmail({item.companyName});
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
        {/* <Card.Body className="d-flex justify-content-center">
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
        </Card.Body> */}
      </Container>{" "}
    </div>
  );
};

export default Partners;
