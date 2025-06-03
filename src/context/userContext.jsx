import { createContext , useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const [ userDetails, setuserDetails] = useState({
        loggedin: false,
        name:"",
        email:"",
        token:""
    });

    const login = (data) => {
      setuserDetails({
        loggedin: true,
        name: data?.name,
        email: data?.email,
        token: data?.token
      })
      localStorage.setItem("token", data.token);
      navigate("/");
    }

    const logout = () => {
      setuserDetails({
        loggedin: false,
        name:"",
        email:"",
        token:""
      });
      localStorage.removeItem("token");
      navigate("/login");
      toast.info("Logged Out")
    }
  return (
    <userContext.Provider value = {{ userDetails, setuserDetails, login, logout }}>
        {children}
    </userContext.Provider>
  )
}

export const useUser = () => useContext(userContext);