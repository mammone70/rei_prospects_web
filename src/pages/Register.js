import { Link } from "react-router-dom";
import { useContext, useState } from "react";
//import { eventNames } from "process";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
    const {toast} = useContext(ToastContext);
    const {registerUser} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = event => {
        const {name,value} = event.target;
        setCredentials({...credentials,[name]:value});
    }

    const handleSubmit = (event) => {
        console.log(credentials);

        event.preventDefault();
        console.log(credentials);
        if (
            !credentials.email || 
            !credentials.password || 
            !credentials.confirmPassword) {
                toast.error("Please enter all the required fields!");
                return;
        }

        if (credentials.password !== credentials.confirmPassword){
            toast.error("Passwords do not match.")
            return;
        }

        const userData = {...credentials, confirmPassword: undefined};
        registerUser({userData});
    };

    return <>
        <ToastContainer autoClose={2000}/>
        <h3>Create Your Account</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputName" className="form-label mt-4">Name</label>
                <input  type="text" 
                        className="form-control" 
                        id="inputName" 
                        name="name"
                        value={credentials.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail1" className="form-label mt-4">Email address</label>
                <input  type="email" 
                        className="form-control" 
                        id="inputEmail1" 
                        aria-describedby="emailHelp" 
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
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
            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label mt-4">Confirm Password</label>
                <input  type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"  
                        required      
                />
            </div>
            <input  type="submit"
                    value="Register"
                    className="btn btn-primary my-3"/>
            <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </form>
    </>;
}; 

export default Register;