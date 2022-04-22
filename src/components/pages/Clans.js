import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  FormControl,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import delate from "../../assets/images/delete.svg";
import view from "../../assets/images/view.svg";
import { useSelector, useDispatch } from "react-redux";
import { getClanThunk } from "../../redux/actions/clanAction";
import star from "../../assets/images/star.svg";
import ClanInfoModal from "./modals/clanInfoModal";
import axios from "axios";
import search from "../../assets/images/search.svg";
import { useAlert } from "react-alert";
import {baseUrl} from "../../config"
const Clans = () => {
  const alert = useAlert();

  const allClans = useSelector((state) => state?.ClanReducer.clans);
  const dispatch = useDispatch();
  const [showIfo, setShowInfo] = useState("");
  const [currentName, setCurrentName] = useState({});
  const [currentScore, setCurrentScore] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [searchedAllClans, setSearchedAllClans] = useState([]);
  const [currentId, setUserClasValue] = useState();
  const [c, setC] = useState(allClans);
  const [curentClanId, setCurrentClanId] = useState();
  const sendDeleate = (id) => {
    axios
      .post(`${baseUrl}/clan/deleate`, {
        id: id,
      })
      .then(function (response) {
        alert.success("Clan is deleated!");
        setC(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getClanThunk());
  }, []);

  useEffect(() => {
    if (c) {
      setSearchedAllClans(c);
    }
  }, [c]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        <strong>Delate ?</strong> <br />
        <Button onClick={() => sendDeleate(currentId)}>yes</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      <Card className="d-flex justify-content-around">
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Clans</h2>
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
                const searchedClans = c.filter((p) => {
                  return p.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                });
                setSearchedAllClans(searchedClans);
                setSearchValue(e.target.value);
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
              <th>Creator</th>
              <th>Schore</th>
              <th>Wiew</th>
              <th>Deleate</th>
            </tr>
          </thead>
          <tbody>
            {c &&
              c.map((c, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{c.name}</td>
                    <td>creator</td>
                    <td>
                      {c.score}
                      <img
                        src={star}
                        alt="star"
                        style={{ marginBottom: "5px", marginLeft: "5px" }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowInfo(true);
                          setCurrentName(c.name);
                          setCurrentScore(c.score);
                          setCurrentClanId(c.id)
                        }}
                      >
                        <img src={view} alt="view" />
                      </Button>
                    </td>
                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={popover}
                      >
                        <Button
                          variant="primary"
                          onClick={() => setUserClasValue(i.id)}
                        >
                          <img src={delate} alt="delate" />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <ClanInfoModal
          show={showIfo}
          onHide={() => setShowInfo(false)}
          name={currentName}
          score={currentScore}
          curentClanId={curentClanId}
        />
      </Container>
    </div>
  );
};

export default Clans;
