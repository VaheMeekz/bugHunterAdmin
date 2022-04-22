import React, { useEffect } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import delate from "../../assets/images/delete.svg";
import submit from "../../assets/images/check-lg.svg";
import { getProgramsThunk } from "../../redux/actions/reportsAction.js";
import { baseUrl } from "../../config";

const Programs = () => {
  const dispatch = useDispatch();
  const progs = useSelector((state) => state?.ProgramsReducer.programs);

  useEffect(() => {
    dispatch(getProgramsThunk());
  }, []);
  console.log(progs, "progsprogsprogsprogs");
  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Programs</h2>
        </Card.Body>
      </Card>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>About</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Ptogram Text</th>
              <th>Submit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {progs.map(
              ({
                id,
                name,
                about,
                status,
                minPrice,
                maxPrice,
                programText,
              }) => {
                <>
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{about}</td>
                    <td>{minPrice}</td>
                    <td>{maxPrice}</td>
                    <td>{programText}</td>
                    <td>
                      <Button variant="primary">
                        <img src={submit} alt="submit" />
                      </Button>
                    </td>
                    <td>
                      <Button variant="primary">
                        <img src={delate} alt="view" />
                      </Button>
                    </td>
                  </tr>
                </>;
              }
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Programs;
// {status == "new" ? () : null}
