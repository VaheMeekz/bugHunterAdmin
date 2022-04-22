import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRepThunk } from "../../redux/actions/reportsAction";
import axios from "axios";
import {
  Card,
  Container,
  Table,
  Button,
  Form,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import deleate from "../../assets/images/delete.svg";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import { baseUrl } from "../../config";

const Reports = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [reps, setReps] = useState([]);
  const allReports = useSelector((state) => state?.ProgramsReducer.reports);
  const [currentStatus, setCurrentStatus] = useState("new");
  const [thisRep, setThisRep] = useState();
  const [currentId, setUserClasValue] = useState();

  const [r, setR] = useState([]);
  useEffect(() => {
    dispatch(getRepThunk());
  }, [reps]);

  useEffect(() => {
    setR(allReports);
  }, []);

  useEffect(() => {
    axios.get(`${baseUrl}/reports/allReports`).then((resp) => {
      setR(resp.data.reverse());
    });
  }, []);

  const handleDeleate = (id) => {
    axios
      .post(`${baseUrl}/reports/deleate`, {
        id: id,
      })
      .then(function (response) {
        alert.success("Success!");
        setR(response.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        <strong>Delate ?</strong> <br />
        <Button onClick={() => handleDeleate(currentId)}>yes</Button>
      </Popover.Body>
    </Popover>
  );

  const accept = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        <strong>Accept ?</strong> <br />
        <Button
          onClick={() => {
            setCurrentStatus("accept");
            handleChangeStatus(thisRep);
          }}
        >
          Accept
        </Button>
      </Popover.Body>
    </Popover>
  );

  const handleChangeStatus = (id) => {
    axios
      .post(`${baseUrl}/reports/updateStatus`, {
        id: id,
        status: currentStatus,
      })
      .then(function (response) {
        alert.success("Status is Changed!");
        setR(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert.error("You just broke something!");
      });
  };

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Reports</h2>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Asset</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Title</th>
              <th>Weakness</th>
              <th>View</th>
              <th>Change Status</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {r &&
              r.map(
                ({
                  status,
                  description,
                  severity,
                  id,
                  title,
                  weakness,
                  user_id,
                }) => {
                  return (
                    <>
                      {status == "new" ? (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{description}</td>
                          <td>{severity}</td>
                          <td>{title}</td>
                          <td>{weakness}</td>
                          <td>{user_id}</td>
                          <td>
                            <NavLink to={`/dashbord/report/${id}`}>
                              <Button>View</Button>
                            </NavLink>
                          </td>

                          <td>
                            <OverlayTrigger
                              trigger="click"
                              placement="bottom"
                              overlay={accept}
                            >
                              <Button
                                onClick={() => {
                                  setCurrentStatus("accept");
                                  setThisRep(id);
                                }}
                              >
                                Accept
                              </Button>
                            </OverlayTrigger>{" "}
                            <Button
                              style={{ margin: "10px 0" }}
                              variant="danger"
                              onClick={() => {
                                setCurrentStatus("rejected");
                                handleChangeStatus(id);
                              }}
                            >
                              Reject
                            </Button>{" "}
                          </td>
                          <td>
                            <OverlayTrigger
                              trigger="click"
                              placement="bottom"
                              overlay={popover}
                            >
                              <Button
                                variant="primary"
                                onClick={() => setUserClasValue(id)}
                              >
                                <img src={deleate} alt="delate" />
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  );
                }
              )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Reports;
