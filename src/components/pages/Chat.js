import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Container,
  ListGroup,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import send from "../../assets/images/send-fill.svg";
import css from "./chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getConversationThunk } from "../../redux/actions/conversationAction";
import axios from "axios";
import { getUsersThunk, getAdminsThunk } from "../../redux/actions/usersAction";
import { baseUrl } from "../../config";
const Chat = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const conv = useSelector((state) => state.ConversationReducer.conversations);
  const recivers = useSelector((state) => state?.UsersReducer.users);
  const [activChat, setActiveChat] = useState(null);
  const [thisUserMessag, setThisUseserMessages] = useState();
  const [messageValue, setMessageValue] = useState("");
  const [searchedAllClans, setSearchedAllClans] = useState([]);
  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  useEffect(() => {
    dispatch(getAdminsThunk());
  }, []);

  useEffect(() => {
    if (recivers) {
      setSearchedAllClans(recivers);
    }
  }, [recivers]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/users/hackers`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    dispatch(getConversationThunk());
  }, []);

  const handleSend = () => {
    if (messageValue !== "") {
      axios
        .post(`${baseUrl}/adminMessages`, {
          reciverId: activChat,
          message: messageValue,
        })
        .then(function (response) {
          setThisUseserMessages(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      setThisUseserMessages((prev) => [...prev, messageValue]);
      setMessageValue("");
    }
  };

  const handleGetMessages = (id) => {
    axios
      .post(`${baseUrl}/adminMessages/thisUser`, {
        reciverId: id,
      })
      .then(function (response) {
        setThisUseserMessages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={css.boxChat}>
      <Card className="d-flex justify-content-around">
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Messages</h2>
        </Card.Body>
      </Card>
      <Container className="d-flex mt-3 mr-3">
        <div style={{ width: "30%", height: "560px" }}>
          <h2>Hackers</h2>
          <ListGroup as="ul" className={css.reciversBox}>
            <ListGroup.Item>
              <Form.Control
                placeholder="Search"
                style={{ width: "100%" }}
                // value={searchValue}
                onChange={(e) => {
                  const searchedClans = recivers.filter((p) => {
                    return p.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  });
                  setSearchedAllClans(searchedClans);
                  searchValue(e.target.value);
                }}
              />
            </ListGroup.Item>
            {searchedAllClans.map((item) => {
              return (
                <ListGroup.Item
                  key={item.uuid}
                  as="li"
                  onClick={() => {
                    setActiveChat(item.id);
                    handleGetMessages(item.id);
                  }}
                  variant={item.id === activChat ? "primary" : "Secondary"}
                >
                  {item.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <div style={{ width: "70%" }} className="m-3">
          <Container
            style={{ height: "550px", background: "white" }}
            className="ml-3"
          >
            <Container
              style={{ background: "", height: "500px", overflowY: "scroll" }}
              // className="d-flex"
            >
              <div style={{ width: "100%" }} className="pt-2"></div>
              {thisUserMessag &&
                thisUserMessag.map((i) => {
                  return (
                    <div className="d-flex justify-content-end">
                      <div className={`${css.messageBox}`}>{i.message}</div>
                    </div>
                  );
                })}
            </Container>
            {activChat == null ? (
              "Plese Choose Conversation"
            ) : (
              <Container style={{ height: "50px" }}>
                <InputGroup className="">
                  <FormControl
                    placeholder="message"
                    aria-describedby="basic-addon2"
                    value={messageValue}
                    onChange={(e) => {
                      setMessageValue(e.target.value);
                    }}
                  />
                  <InputGroup.Text
                    id="basic-addon2"
                    style={{ cursor: "pointer" }}
                    variant="primary"
                    onClick={() => handleSend()}
                  >
                    <img src={send} alt="send" />
                  </InputGroup.Text>
                </InputGroup>
              </Container>
            )}
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Chat;
