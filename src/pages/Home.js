import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    useEffect(() => {
        !user && navigate("/login", {replace : true});
    },[])
    return(
        <>
            <div className="jumbotron">
                <h3 className="display-4">Welcome {user ? user.name : null}</h3>
                <p className="lead">
                    
                </p>
                <hr className="my-4"/>
                <p className="lead">
                    <a className="btn btn-info btn-lg" href="/create" role="button">
                        Add Prospects
                    </a>
                </p>
            </div>
        </>
    );
}; 

export default Home;