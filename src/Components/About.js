import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function About() {
  const { id } = useParams();
  const [value, setValue] = useState([]);
  const getUser = async () => {
    await axios
      .get(`https://gorest.co.in/public/v2/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${"3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db"}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setValue(res.data);
      });
  };
  useEffect(() => {
    getUser();
  });
  console.log(value);
  return (
    <>
      {value && (
        <>
          <h5 className="text-center m-3">Author Details</h5>

          <table className="table table-about">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td> {value.email}</td>
              </tr>
            </tbody>
          </table>
          <Link to={"/"} className="backtohomepagelink">Back to Home Page</Link>
        </>
      )}
    </>
  );
}

export default About;
