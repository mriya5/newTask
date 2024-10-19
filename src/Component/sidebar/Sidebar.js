import React, { useEffect, useState } from 'react';
import * as Auth from "../../Route/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Sidebar({handleToggle}) {

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 792);

  const isLogin = Auth.isAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 792);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDashboardClick = () => {
    if(isLogin) {
      navigate('/')
    }
    else {
      toast.error("Please login/signup")
    }
  }

  const handleMortageData = () => {
    if(isLogin) {
      navigate('/mortageData')
    }
    else {
      toast.error("Please login/signup")
    }
  }
  return (
    <>
      <Toaster
      position="top-right"
      reverseOrder={false}
      />
        <aside className="sidebar" >
          {isMobileView &&
            <div 
              style={{backgroundColor: 'white', height: "30px", width: "30px", marginLeft: "90%", borderRadius: '50%', transition: 'all 0.1s' }}
              onClick={handleToggle}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/9196/9196218.png"
                style={{ height: "30px", width: "30px" }}
              />
          </div>
          }
          <nav>
            <ul>
              <div className="sidebar-links" onClick={handleDashboardClick}>
                <img src="https://cdn-icons-png.flaticon.com/128/15580/15580960.png" alt="Dashboard Icon" />
                <li>Dashboard</li>
              </div>
              <div className="sidebar-links" onClick={handleMortageData}>
                <img src="https://cdn-icons-png.flaticon.com/128/9809/9809574.png" alt="Client Mortgage Data Icon" />
                <li>Client Mortgage Data</li>
              </div>
            </ul>
          </nav>
          
        </aside>
    </>
  );
}
