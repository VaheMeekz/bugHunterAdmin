import React from 'react';
import css from "../login/login.module.css";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {LOGIN_PAGE} from "../../utils/urls";
import {useHistory} from "react-router-dom";

const Registration = () => {

    const router = useHistory()
    return (
        <div className={css.loginBox}>
            <Container className="p-5 d-flex justify-content-center align-content-center">
                <Row className={css.row}>
                    <Col className='p-3'>
                        <Card className={css.card}>
                            <h1 className='h1'>REGISTRATION</h1>
                            <Form className='d-flex justify-content-center align-content-center flex-column'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"/>
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Registration
                                </Button>
                                <p className='pt-2 h6'  onClick={()=>router.push(LOGIN_PAGE)}>Go To Login </p>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Registration;