import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import css from "./login.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeisAuthAC } from "../../redux/actions/authAction";
import axios from "axios";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";

const Login = () => {
  const alert = useAlert();
  const isAuth = useSelector((state) => state?.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/admin/login`, {
        email: username,
        password,
      })
      .then(function (response) {
      console.log('response :', response.data);

        if (response.data.token !== undefined) {
          localStorage.setItem("info",JSON.stringify(response.data))
          let auth = localStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
          );
          dispatch(changeisAuthAC(true));
          history.push("/dashbord");
        }
        if (response.data.err) {
          alert.error(response.data.err);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={css.loginBox}>
      <Container className="p-5 d-flex justify-content-center align-content-center">
        <Row className={css.row}>
          <Col className="p-3">
            <Card className={css.card}>
              <h1 className="h1">Login</h1>
              <Form className="d-flex justify-content-center align-content-center flex-column">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="dark" onClick={handleSubmit}>
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
