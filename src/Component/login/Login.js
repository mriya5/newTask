import React, { useState } from "react";
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { validataloginData } from "../../utils/helper";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {

  const [loginformData, setLoginFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleInputForm = (e) =>{
    const {name, value} = e.target;
    setLoginFormData({
      ...loginformData,
      [name]: value
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const valid = validataloginData(loginformData)
    if(valid == "confirm") {
      localStorage.setItem('jwt', loginformData.email)
      toast.success("You are successfully Logged In!")
      navigate('/dashboard')
      setLoginFormData({
        email: '',
        password: ''
      })
      
    }
    else {
      toast.error(valid)
    }
  }
  
  return (
    <>
    <Toaster
      position="top-right"
      reverseOrder={false}
      />
    <div className="login-form-container">
      <h1 style={{ fontSize: "25px" }}>Login</h1>
      <div className="login-box">
        <img src="./logo.png" alt="Reifai" className="login-logo" />
        <form onSubmit={handleSubmitForm}>
          <div className="input-group">
            <label htmlFor="email">EMAIL</label>
            <div className="inputlabel">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="marcus.freedom@domain.com"
                value={loginformData.email}
                onChange={handleInputForm}
                autoComplete="off"
              />
              <div
                className="dotBox"
              >
                ...
              </div>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="inputlabel">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={loginformData.password}
                onChange={handleInputForm}
                autoComplete="off"
              />
              <div
                className="dotBox"
              >
                ...
              </div>
              <input
                type="checkbox"
                style={{ height: "15px", width: "15px", marginLeft: "5px" }}
              />
            </div>
          </div>
          <div className="loginBtn">
            <button type="submit" className="login-btn">
              <img src="https://cdn-icons-png.flaticon.com/128/17854/17854236.png" />
              Login
            </button>
          </div>
        </form>
        <div className="login-footer">
          <p>
            If you do not have an account <Link to="/signup">click here</Link> to create
            an account.
          </p>
          <Link to="/">Forgot your password?</Link>
        </div>
      </div>
    </div>
    </>
  );
}
