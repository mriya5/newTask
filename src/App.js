import './App.css';
import Sidebar from './Component/sidebar/Sidebar';
import Header from './Component/header/Header';
import SignUp from './Component/signUp/Signup';
import Marketdata from './Component/dashboard/Marketdata';
import Login from './Component/login/Login';
import { useEffect, useState } from 'react';
import RouterPage from './Route';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 792);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 792);
      if (window.innerWidth > 792) {
        setIsSidebarOpen(false); // Close sidebar when resizing to larger view
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    console.log("hhhh")
    setIsSidebarOpen(!isSidebarOpen); // Toggle the visibility of the sidebar
  };
  
  return (
    <BrowserRouter>
    <div className="App">
      <div className="mainContainer">
        <Header/>
        {(isMobileView && !isSidebarOpen) &&
          <div className='' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <img
                src="https://cdn-icons-png.flaticon.com/128/9196/9196218.png"
                style={{ height: "30px", width: "30px", marginLeft: "20px", marginTop: '20px' }}
                // onClick={toggleSidebar}
            />
          </div>
        }
        <div className="sideBarContent" >
          <div className='sideBarContent' style={{display: (isMobileView && !isSidebarOpen) && 'none', zIndex: (isMobileView && !isSidebarOpen) && 99999999, position: (isMobileView && isSidebarOpen) && 'absolute'}}>
            <Sidebar handleToggle = {toggleSidebar} />
          </div>
          <RouterPage />
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
