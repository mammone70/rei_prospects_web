import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

    const EditProspect = () => {
        const { id } = useParams();
        const navigate = useNavigate();

        const { toast } = useContext(ToastContext);

        const [ProspectDetails, setProspectDetails] = useState({
            ownerFirstName: "",
            ownerLastName: "", 
            propertyAddress: "",
            propertyCity: "",
            propertyState: "",
            propertyZipcode: "",
            propertyCounty: "",
            mailingAddress: "",
            mailingCity: "",
            mailingState: "",
            mailingZipcode: "",
        });
        const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProspectDetails({ ...ProspectDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospect/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...ProspectDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`updated [${ProspectDetails.propertyAddress}] Prospect`);

      setProspectDetails({ 
            ownerFirstName: "",
            ownerLastName: "", 
            propertyAddress: "",
            propertyCity: "",
            propertyState: "",
            propertyZipcode: "",
            propertyCounty: "",
            mailingAddress: "",
            mailingCity: "",
            mailingState: "",
            mailingZipcode: "",
      });

      navigate("/prospects");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchData = async() => {
        setLoading(true);
        try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospect/${id}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const result = await res.json();
        setProspectDetails({ 
            ownerFirstName: result.ownerFirstName,
            ownerLastName: result.ownerLastName, 
            propertyAddress: result.propertyAddress,
            propertyCity: result.propertyCity,
            propertyState: result.propertyState,
            propertyZipcode: result.propertyZipcode,
            propertyCounty: result.propertyCounty,
            mailingAddress: result.mailingAddress,
            mailingCity: result.mailingCity,
            mailingState: result.mailingState,
            mailingZipcode: result.mailingZipcode, 
        });

        setLoading(false);
        } catch (err) {
        console.log(err);
        }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Prospect..." />
      ) : (
        <>
          <h2>Edit Prospect</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ownerFirstName" className="form-label mt-4">Owner First Name</label>
                    <input  type="text" 
                            className="form-control" 
                            id="ownerFirstName" 
                            name="ownerFirstName"
                            value={ProspectDetails.ownerFirstName}
                            onChange={handleInputChange}
                            placeholder="Owner First Name"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ownerLastName" className="form-label mt-4">Owner Last Name</label>
                        <input  type="text" 
                                className="form-control" 
                                id="ownerLastName" 
                                name="ownerLastName"
                                value={ProspectDetails.ownerLastName}
                                onChange={handleInputChange}
                                placeholder="Owner Last Name"
                                required
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="propertyAddress" className="form-label mt-4">Property Address</label>
                    <input  type="text" 
                            className="form-control" 
                            id="propertyAddress" 
                            name="propertyAddress"
                            value={ProspectDetails.propertyAddress}
                            onChange={handleInputChange}
                            placeholder="Property Address"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="propertyCity" className="form-label mt-4">Property City</label>
                    <input  type="text" 
                            className="form-control" 
                            id="propertyCity" 
                            name="propertyCity"
                            value={ProspectDetails.propertyCity}
                            onChange={handleInputChange}
                            placeholder="Property City"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="propertyState" className="form-label mt-4">Property State</label>
                    <input  type="text" 
                            className="form-control" 
                            id="propertyState" 
                            name="propertyState"
                            value={ProspectDetails.propertyState}
                            onChange={handleInputChange}
                            placeholder="Property State"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="propertyZipcode" className="form-label mt-4">Property Zipcode</label>
                    <input  type="text" 
                            className="form-control" 
                            id="propertyZipcode" 
                            name="propertyZipcode"
                            value={ProspectDetails.propertyZipcode}
                            onChange={handleInputChange}
                            placeholder="Property Zipcode"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="propertyCounty" className="form-label mt-4">Property County</label>
                    <input  type="text" 
                            className="form-control" 
                            id="propertyCount" 
                            name="propertyCounty"
                            value={ProspectDetails.propertyCounty}
                            onChange={handleInputChange}
                            placeholder="Property County"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingAddress" className="form-label mt-4">Mailing Address</label>
                    <input  type="text" 
                            className="form-control" 
                            id="mailingAddress" 
                            name="mailingAddress"
                            value={ProspectDetails.mailingAddress}
                            onChange={handleInputChange}
                            placeholder="Mailing Address"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingCity" className="form-label mt-4">Mailing City</label>
                    <input  type="text" 
                            className="form-control" 
                            id="mailingCity" 
                            name="mailingCity"
                            value={ProspectDetails.mailingCity}
                            onChange={handleInputChange}
                            placeholder="Mailing City"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingState" className="form-label mt-4">Mailing City</label>
                    <input  type="text" 
                            className="form-control" 
                            id="mailingCity" 
                            name="mailingCity"
                            value={ProspectDetails.mailingState}
                            onChange={handleInputChange}
                            placeholder="Mailing City"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingZipcode" className="form-label mt-4">Mailing Zipcode</label>
                    <input  type="text" 
                            className="form-control" 
                            id="mailingZipcode" 
                            name="mailingZipcode"
                            value={ProspectDetails.mailingZipcode}
                            onChange={handleInputChange}
                            placeholder="Mailing Zipcode"
                            required
                    />
                </div>
                <input  type="submit"
                        value="Update Prospect"
                        className="btn btn-info my-4"/>
            </form>   
        </>
      )}
    </>
  );
};

export default EditProspect;