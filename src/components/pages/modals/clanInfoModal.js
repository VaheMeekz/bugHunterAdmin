import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import star from "../../../assets/images/star.svg";
import { baseUrl } from "../../../config";
import { token } from "../../../utils/token";

const ClanInfoModal = (props) => {
  console.log("props :", props.curentClanId);
  const [clanMemmbers, setClanMembers] = useState([]);
  console.log("clanMemmbers :", clanMemmbers);

  useEffect(() => {
    axios
      .post(
        `${baseUrl}/users/members`,
        {
          clanId: props.curentClanId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setClanMembers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.curentClanId]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Clan Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{props.name}</h3>
        <h4>
          {props.score}
          <img src={star} alt="star" />
        </h4>
        <ul>
          {!clanMemmbers.message &&
            clanMemmbers.map((i) => {
              return (
                <li>
                  <img
                    src={i.averageBounty}
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                    }}
                  />
                  {i.name}
                </li>
              );
            })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClanInfoModal;
