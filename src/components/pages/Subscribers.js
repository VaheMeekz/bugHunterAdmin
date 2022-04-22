import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSubThunk } from "../../redux/actions/subscribersAction";
import SubscribersModal from './modals/SubscribersMailModal'
import { baseUrl } from "../../config";

const Suibscribers = () => {
  const dispatch = useDispatch();
  const [showMailModal,setShowMailModal] = useState(false)
  const subscribers1 = useSelector(
    (state) => state.SubscribersReducer.subscribers
  );

  useEffect(() => {
    dispatch(getSubThunk());
  }, []);

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Subscribers</h2>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {subscribers1.map((s,i) => {
              return (
                <>
                  <tr key={s.id}>
                    <td>{i+1}</td>
                    <td>{s.email}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Button variant="dark" onClick={()=>setShowMailModal(true)}>Send Message</Button>
        </div>
        <SubscribersModal show={showMailModal}  onHide={() => setShowMailModal(false)}/>
      </Container>
    </div>
  );
};

export default Suibscribers;
