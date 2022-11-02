import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { Link } from "react-router-dom";
import "./ToDo.css";
import { Col, Row } from "react-bootstrap";
function ToDo() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perpage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    loadUserData();
  }, [offset]);

  const loadUserData = async () => {
    const res = await axios.get("https://gorest.co.in/public/v2/todos", {
      headers: {
        Authorization: `Bearer ${"3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db"}`,
        "Content-Type": "application/json",
      },
    });
    const user = res.data;
    const slice = user.slice(offset, offset + perpage);
    setData(slice);
    setPageCount(Math.ceil(user.length / perpage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    // console.log(selectedPage, "output")
    setOffset(selectedPage * perpage);
  };
  const handleFilter = async (value) => {
    const res1 = await axios.get(
      `https://gorest.co.in/public/v2/todos?status=${value}`,
      {
        headers: {
          Authorization: `Bearer ${"3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db"}`,
          "Content-Type": "application/json",
        },
      }
    );
    const user = res1.data;
    const slice = user.slice(offset, offset + perpage);
    setData(slice);
  };
  const handleData = async () => {
    const res2 = await axios.get(`https://gorest.co.in/public/v2/todos`, {
      headers: {
        Authorization: `Bearer ${"3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db"}`,
        "Content-Type": "application/json",
      },
    });
    const user = res2.data;
    const slice = user.slice(offset, offset + perpage);
    setData(slice);
  };

  return (
    <div className="w-100 " style={{ marginTop: "20px" }}>
      <h4>Status Progress</h4>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
              <button
                className="btn btn-primary mt-3 mb-3 "
                onClick={() => handleData()}
              >
                Reset
              </button>&nbsp;
              <button
                className="btn btn-success mt-3 mb-3 completedbutton"
                onClick={() => handleFilter("completed")}
              >
                Completed
              </button>&nbsp;
              <button
                className="btn btn-danger mt-3 mb-3 pendingbutton"
                onClick={() => handleFilter("pending")}
              >
                Pending
              </button>
              </Col>
          </Row>

      <Row>
        <Col>
          <div className="table-responsive">
            <table className="table">
              <thead className="table-dark ">
                <tr>
                  <th>User_Id</th>
                  <th>Title</th>
                  <th>Due_On</th>
                  <th>Status</th>
                </tr>
              </thead>
              {data.length === 0 ? (
                <tbody>
                  <tr>
                    <td> Unable to Fund Data </td>
                  </tr>
                </tbody>
              ) : (
                data.map((e, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{e.user_id}</td>
                      <td>{e.title}</td>
                      <td>{moment(e.due_on).format("DD/MM/YYYY")}</td>
                      <td>{e.status}</td>
                    </tr>
                  </tbody>
                ))
              )}
            </table>
          </div>
        </Col>
      </Row>

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={4}
        pageRangeDisplayed={8}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        subContainerClassName={"page-item"}
        activeClassName={"active"}
      />

      <Link to={"/"} className="backtohomepagelink">
        Back to Home Page
      </Link>
    </div>
  );
}

export default ToDo;
