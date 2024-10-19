import React, { useState } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./signup.css";
import toast, { Toaster } from "react-hot-toast";
import { validataSignUpData } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    fname : '',
    lname: '',
    email: '',
    age: 0
  })


  const navigate = useNavigate()

  const handleFormData = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value,})
  }

  const handleAge = (e) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, "")
    if(newNumber.length < 3){
      setFormData({...formData, age: newNumber})
    }
  }

  const handleIncreAge = () => {
    if(formData.age != 99) {
      const increased = formData.age + 1;
      setFormData({...formData, age: increased})
    }
  }

  const handleDecreAge = () => {
    if(formData.age > 0) {
      const decreased = formData.age - 1;
      setFormData({...formData, age: decreased})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = validataSignUpData(formData)
    if(valid == "confirm") {
      localStorage.setItem('jwt', formData.email)
      toast.success("You are successfully Logged In!")
      navigate('/')
      setFormData({
        fname : '',
        lname: '',
        email: '',
        age: 0
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
        <div className="signup">
          <h1 style={{ fontSize: "25px" }}>Sign Up</h1>
          <div className="signup-form">
            <img src="./logo.png" alt="" />
            <div className="tabContainer">
              <div className="tab1">
                <p style={{ paddingLeft: "7px", paddingTop: "3px" }}>1</p>
              </div>
              <div className="tab2">
                <p style={{ paddingLeft: "7px", paddingTop: "3px" }}>2</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="signup-box">
                <label htmlFor="firstname">FIRSTNAME</label>
                <div className="inputlabel">
                  <input 
                    type="text" 
                    id="id" 
                    name="fname" 
                    value={formData.fname} 
                    onChange={handleFormData}
                    autoComplete="off" />
                  <div
                    className="dotBox"
                  >
                    ...
                  </div>
                </div>
              </div>
              <div className="signup-box">
                <label htmlFor="lastname">LASTNAME</label>
                <div className="inputlabel">
                  <input 
                    type="text"  
                    id="id" 
                    name="lname" 
                    onChange={handleFormData}
                    autoComplete="off" />
                  <input
                    type="checkbox"
                    style={{ height: "15px", width: "15px" }}
                  />
                </div>
              </div>
              <div className="signup-box">
                <label htmlFor="email">EMAIL</label>
                <div className="inputlabel">
                  <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleFormData}
                    autoComplete="off" />
                  <input
                    type="checkbox"
                    style={{ height: "15px", width: "15px" }}
                  />
                </div>
              </div>
              <div className="signup-box">
                <label htmlFor="age">AGE</label>
                <div className="inputlabel">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10695/10695889.png"
                    style={{ height: "15px", width: "15px" }}
                    onClick={handleDecreAge}
                  />
                  <input 
                    type="text" 
                    id="age" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleAge} 
                    autoComplete="off" />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10695/10695881.png"
                    style={{ height: "15px", width: "15px" }}
                    onClick={handleIncreAge}
                  />
                </div>
              </div>
              <p className="loginLink">Have an Account? <Link to="/">Login</Link></p>
              <div className='signUpButton'>
                <button type="submit" className="signUp-btn">signUp</button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
