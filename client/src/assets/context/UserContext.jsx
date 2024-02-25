import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {

  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const currentPath = window.location.pathname;
    if (userInfo) {
      console.log(userInfo);
      setUserDetails(userInfo);
    }else if (!userInfo) {
      // If userInfo is not available and current path is not register, redirect to login
      if (currentPath !== '/auth/register') {
        navigate('/auth/login');
      }
    } else {
      // If userInfo is available and current path is not login, redirect to register
      if (currentPath !== '/auth/login') {
        navigate('/auth/register');
      }
      setUserDetails(userInfo);
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}

export const  UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;

