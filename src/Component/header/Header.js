import React, { useState } from "react";
import * as Auth from "../../Route/auth";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Header( ) {
  const [toggleLogout, setToggleLogout] = useState(false);

  const isLogin = Auth.isAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    toast.success("Successfully Logout")
    navigate("/");
    setToggleLogout(false)

  };
  return (
    <>
    <Toaster
      position="top-right"
      reverseOrder={false}
      />
    <header className="header" style={{paddingRight: '40px'}}>
      <div className="logo-section">
        <img src=".\logo.png" style={{ height: "40px", width: "150px", cursor: 'pointer' }} onClick={() => navigate('/')} />
      </div>
      <div className="header-links">
        <div className="links">
          <img src="https://cdn-icons-png.flaticon.com/128/8407/8407947.png" />
          <Link to="/video">Video Tutorial</Link>
        </div>
        <div className="links">
          <img src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png" />
          <Link to="/admin">Admin</Link>
        </div>
        {isLogin && (
          <div
            className="links"
            onClick={() => setToggleLogout(!toggleLogout)}
            style={{ cursor: "pointer" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/2609/2609282.png" />
            <p>Hello User</p>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9126/9126125.png"
              style={{ height: "20px", width: "20px", marginLeft: "5px" }}
            />
          </div>
        )}
      </div>
      {toggleLogout && (
        <div className="logoutContainer" onClick={handleLogout}>
          <p>Logout</p>
        </div>
      )}
    </header>
    </>
  );
}
