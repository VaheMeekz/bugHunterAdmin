import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
// import edit from "../../assets/images/edit.svg";
import delate from "../../assets/images/delete.svg";
// import view from "../../assets/images/view.svg";
import { useSelector, useDispatch } from "react-redux";
import { getUsersThunk } from "../../redux/actions/usersAction";
import axios from "axios";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";

const Hackers = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState();

  let users = useSelector((state) => state?.UsersReducer.users);
  const [u, setU] = useState(users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  useEffect(() => {
    setU(users);
  }, [users]);

  const handlerDelateUser = (id) => {
    axios
      .post(`${baseUrl}/users/deleate`, {
        id,
      })
      .then(function (response) {
        alert.success("User is deleated");
        setU(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert.error("You just broke something!");
      });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Delate?</Popover.Header>
      <Popover.Body>
        <strong>Delate ?</strong> <br />
        <Button onClick={() => handlerDelateUser(currentId)}>yes</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Hackers</h2>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Clan</th>
              <th>TotalBountiesPaid</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {u.map((u, i) => {
              return u.userClass === "hacker" ? (
                <tr key={i}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.clan ? u.clan : "-"}</td>
                  <td>{u.totalBountiesPaid}</td>
                  <td>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      overlay={popover}
                    >
                      <Button
                        variant="primary"
                        onClick={() => setCurrentId(u.id)}
                      >
                        <img src={delate} alt="delate" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Hackers;
