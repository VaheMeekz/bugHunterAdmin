import React, { useState } from "react";
import css from "./dashbord.module.css";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const Dashbord = () => {
  const pages = useSelector((state) => state?.PagesReducer.pages);
  const [currentPage, setCurrentPage] = useState(1);
 
  return (
    <div className={css.homeBox}>
      <div className={css.drawer}>
        <Nav defaultActiveKey="/home" className="flex-column">
          {pages.map(({ id, name }) => {
            return (
              <Nav.Link key={id} onClick={() => setCurrentPage(id)}>
                {name}
              </Nav.Link>
            );
          })}
        </Nav>
      </div>
      <div className={css.content}>
        {pages.map(({ id, name, component }) => {
          return id === currentPage ? component : null;
        })}
      </div>
    </div>
  );
};

export default Dashbord;
