import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
    const {toast} = useContext(ToastContext);
    const {loginUser} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setCredentials({...credentials, [name]:value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error("Please enter all the required fields!");
            return;
        }

        loginUser(credentials);
    };

    return <>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputEmail1" className="form-label mt-4">Email address</label>
                <input  type="email" 
                        className="form-control" 
                        id="inputEmail1" 
                        aria-describedby="emailHelp" 
                        name="email"
                        onChange={handleInputChange}
                        value={credentials.email}
                        placeholder="john@example.com"
                        required
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword" className="form-label mt-4">Password</label>
                <input  type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"   
                        required     
                />
            </div>
            <input  type="submit"
                    value="Login"
                    className="btn btn-primary my-3"/>
            <p>Don't have an account? <Link to="/register">Register Here</Link></p>
        </form>
    </>;
}; 

export default Login;