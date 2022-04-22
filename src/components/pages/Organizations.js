import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import delate from "../../assets/images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationThunk } from "../../redux/actions/usersAction";
import axios from "axios";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";

const Organizations = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const allOrganization = useSelector(
    (state) => state?.UsersReducer.organizations
  );
  const [all, setAll] = useState();
  const [currentId, setUserClasValue] = useState();
  useEffect(() => {
    dispatch(getOrganizationThunk());
  }, []);

  useEffect(() => {
    setAll(allOrganization);
  }, [allOrganization]);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        <strong>Delate ?</strong> <br />
        <Button onClick={() => handlerDelateUser(currentId)}>yes</Button>
      </Popover.Body>
    </Popover>
  );

  const handlerDelateUser = (id) => {
    axios
      .post(`${baseUrl}/users/delOrg`, {
        id,
      })
      .then(function (response) {
        setAll(response.data);
        alert.success("Organization are deleted!");
      })
      .catch(function (error) {
        console.log(error);
      });
    setUserClasValue("hacker");
  };

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Organizations</h2>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Programs</th> */}
              <th>Total Bounties Paid</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {all &&
              all.map((u, index) => {
                return u.userClass === "organization" ? (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    {/* <td>{u.clan}</td> */}
                    <td>{u.totalBountiesPaid}</td>
                    {/* <td>
                      <Form.Select aria-label="Default select example"  onChange={e => setUserClasValue(e.target.value)}>
                        <option value="hacker">Hacker</option>
                        <option value="organization">Organization</option>
                      </Form.Select>
                    </td> */}
                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={popover}
                      >
                        <Button
                          variant="primary"
                          onClick={() => setUserClasValue(u.id)}
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

export default Organizations;
