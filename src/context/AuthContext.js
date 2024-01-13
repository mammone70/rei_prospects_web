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
        //check if user logged in
        const checkUserLoggedIn = async () => {
            if(!localStorage.getItem("token")){
                navigate("/login", {replace:true});
            }
            try {
                const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Auth/checkLogin`, {
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

        checkUserLoggedIn();
     }, [navigate]);

    //login request
    const loginUser = async (userData) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({...userData}),    
            });
            const result = await res.json();
            if(!result?.data.error){
                localStorage.setItem("token", result.data.token);
                setUser(result.data.user);
                toast.success(`Logged in ${result.data.user.name}`);

                navigate("/prospects", {replace: true});
            } else {
                toast.error(result.data.error);
            }
        } catch(err){
            console.log(err);
        }
    };
    
    //register request
    const registerUser = async (userData) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Auth/register`, {
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