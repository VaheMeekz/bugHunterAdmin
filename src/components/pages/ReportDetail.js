import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRepThunk } from "../../redux/actions/reportsAction";
import css from "./detail.module.css";
import axios from "axios";
import Slide from "./modals/slideShow";
import { baseUrl } from "../../config";

const ReportDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const allReports = useSelector((state) => state?.ProgramsReducer.reports);
  const [attachment, setAttachment] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [currentImage, setCurrentUrl] = useState();
  useEffect(() => {
    dispatch(getRepThunk());
  }, []);

  const thisReport = allReports.filter((i) => {
    return id == i.id;
  });

  useEffect(() => {
    axios
      .post(`${baseUrl}/attachment/my`, {
        repId: id,
      })
      .then(function (response) {
        setAttachment(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Card>
        <Card.Body className="d-flex justify-content-center">
          <h2 className="h3">Report</h2>
        </Card.Body>
      </Card>
      <Container className={css.box}>
        {thisReport.map((item, index) => {
          return (
            <div key={index} className={css.boxbox}>
              <div className={css.boxItem}>
                <h4>Title</h4>
                <p>{item.title}</p>
              </div>
              <div className={css.boxItem}>
                <h4>Description</h4>
                <p>{item.description}</p>
              </div>
              <div className={css.boxItem}>
                <h4>AdditionlInfo</h4>
                <p>{item.additionlInfo}</p>
              </div>
              <div className={css.boxItem}>
                <h4>Asset</h4>
                <p>{item.asset}</p>
              </div>
              <div className={css.boxItem}>
                <h4>Severity</h4>
                <p>{item.severity}</p>
              </div>
              <div className={css.boxItem}>
                <h4>Weakness</h4>
                <p>{item.weakness}</p>
              </div>
              <div className={css.slideBox}>
                <h4>Addition</h4>
                <div className={css.slides}>
                  {attachment !== undefined &&
                    attachment.map((i) => {
                      return (
                        <div
                          key={i.id}
                          onClick={() => {
                            setModalShow(true);
                            setCurrentUrl(i.url);
                          }}
                        >
                          <img src={i.url} alt="image" />
                        </div>
                      );
                    })}
                  <Slide
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    currentImage={currentImage}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default ReportDetail;
