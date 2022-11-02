import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <>
    
      <div className="w-100 py-2 header ">
        <Link to="/" className="header ">
          Home Page{" "}
        </Link>
       
        <Link to="/todo" className="header p-2  ">
          ToDo List{" "}
        </Link>
        
      </div>
    </>
  );
}
export default Header;
