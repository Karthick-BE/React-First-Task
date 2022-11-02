import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Home.css";

function Home() {
  const [value, setValue] = useState([]);
  const [offset, setOffset] = useState([0]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await axios.get(`https://gorest.co.in/public/v2/comments`, {
      headers: {
        Authorization: `Bearer ${"3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db"}`,
        "Content-Type": "application/json",
      },
    });
    const value = res.data;
    const slice = value.slice(offset, offset + perPage);
    // const postData = slice.map(pd => <div key={pd.id}>
    //     <p>{pd.name}</p>

    // </div>)
    setValue(slice);
    setPageCount(Math.ceil(value.length / perPage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + perPage);
  };

  useEffect(() => {
    getData();
  });

  const createpost = () => {
    navigate("/createpost");
  };
  function deletePost(id) {
    axios.delete(`https://gorest.co.in/public/v2/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${"3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db"}`,
        "Content-Type": "application/json",
      },
    });
    getData();
  }
  return (
    <>
      <div>
        <button
          className="btn btn-success m-4 createpostbutton"
          type="button"
          onClick={createpost}
        >
          Create Post
        </button>
      </div>

      <table className="table ">
        <thead className="table-dark w-100">
          <tr>
            <th>Authors</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {value.map((v) => (
            <tr>
              <td key={v.id} className="pt-3">
                <Link
                  to={`/about/${v.id}`}
                  className="linktag"
                  style={{ textDecoration: "none" }}
                >
                  {v.name}
                </Link>
              </td>

              <td>
                <button
                  className="btn btn-danger deletepostbutton"
                  type="button"
                  onClick={() => deletePost(v.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  );
}
export default Home;
