import React, { useEffect, useState } from "react";
import { HOME_PAGE, LOGIN_PAGE, notAuthRoutes } from "../../utils/urls";
import { NavLink, useHistory } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import css from "../login/login.module.css";
import { changeisAuthAC } from "../../redux/actions/authAction";
import logo from "../../assets/images/logo-logo.png"
const Header = () => {
  const isAuth = useSelector((state) => state?.AuthReducer.isAuth);
  const [auth, setAuth] = useState("");
  const [info, setInfo] = useState(null);
  console.log("info :", info);
  useEffect(() => {
    setAuth(isAuth);
  }, [isAuth]);
  const dispatch = useDispatch();
  const router = useHistory();

  const logout = () => {
    dispatch(changeisAuthAC(false));
    router.push(LOGIN_PAGE);
  };

  useEffect(() => {
    const foin = JSON.parse(localStorage.getItem("info"));
    setInfo(foin);
  }, [isAuth]);

  return (
    <div>
      <Navbar bg="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand
            onClick={() => router.push(HOME_PAGE)}
            className={css.logo}
          >
            <img src={logo} alt="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            bg="dark"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {!auth &&
                  notAuthRoutes.map(({ id, components, path, name }) => {
                    return (
                      <Nav.Link>
                        {" "}
                        <NavLink key={id} to={path}>
                          {name}
                        </NavLink>
                      </Nav.Link>
                    );
                  })}
                {auth ? (
                  <>
                    <div className="d-flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-patch-check"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                          />
                          <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3  style={{
                          margin: "0 0 0 10px",
                          fontSize: "20px",
                          color: "black",
                        }}>{info.userName}</h3>
                      </div>
                    </div>
                    <hr/>
                    <Nav.Link onClick={() => logout()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        class="bi bi-box-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                        />
                      </svg>
                      <span
                        style={{
                          margin: "0 0 0 10px",
                          fontSize: "20px",
                          color: "black",
                        }}
                      >
                        Logout
                      </span>
                    </Nav.Link>
                  </>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
