import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";
import {useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const {toast} = useContext(ToastContext);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

     useEffect(() => {
        checkUserLoggedIn();
     }, []);

     //check if user logged in
     const checkUserLoggedIn = async () => {
        if(!localStorage.getItem("token")){
            navigate("/login", {replace:true});
        }
        try {
            const res = await fetch('http://localhost:8000/api/me', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if (!result.error) {
                if (
                    window.location.pathname === "/login" ||
                    window.location.pathname === "/register"
                  ) {
                    setTimeout(() => {
                      navigate("/", { replace: true });
                    }, 500);
                  } else {
                    navigate(
                        window.location.pathname ? 
                        window.location.pathname : 
                        "/");
                  }
                  setUser(result);
                } else {
                  navigate("/login", { replace: true });
                }
        } catch (err) {
            console.log(err)
        }
     }

    //login request
    const loginUser = async (userData) => {
        try {
            const res = await fetch('http://localhost:8000/api/login', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({...userData}),    
            });
            const result = await res.json();
            if(!result.error){
                localStorage.setItem("token", result.token);
                setUser(result.user);
                toast.success(`Logged in ${result.user.name}`);

                navigate("/", {replace: true});
            } else {
                toast.error(result.error);
            }
        } catch(err){
            console.log(err);
        }
    };
    
    //register request
    const registerUser = async (userData) => {
        try {
            const res = await fetch('http://localhost:8000/api/register', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({...userData}),    
            });
            const result = await res.json();
            if(!result.error){
                toast.success("Successfully registered!  Please login to your account.");
                navigate("/login", { replace: true});
            } else {
                toast.error(result.error);
            }
        } catch(err) {
            console.log(err);
        }
    };


    return (
        <AuthContext.Provider value={{
                                loginUser, 
                                registerUser, 
                                user,
                                setUser}}>
            {/* <ToastContainer autoClose={2000}/> */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;