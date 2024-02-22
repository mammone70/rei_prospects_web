import { useContext, useState } from "react";
import ToastContext from "../context/ToastContext";

const CreateProspect = () => {
    const {toast} = useContext(ToastContext);

    const [prospectDetails, setProspectDetails] = useState({
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

    const handleInputChange = (event) => {
       const {name, value} = event.target;
       
       setProspectDetails({...prospectDetails, [name]: value});

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER_URL}/Prospect`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }, 
            body: JSON.stringify(prospectDetails),
        });

        const result = await res.json();
        if(!result.error){
            toast.success(`[${prospectDetails.propertyAddress}] added.`)
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
        } else {
            toast.error(result.error);
        } 
    }

    return(
        <>
            <h2>Create Contact</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ownerFirstName" className="form-label mt-4">Owne First Name</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputFirstName" 
                            name="ownerFirstName"
                            value={prospectDetails.ownerFirstName}
                            onChange={handleInputChange}
                            placeholder="Owner First Name"
                       
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ownerLastName" className="form-label mt-4">Owner Last Name</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputLastName" 
                            name="ownerLastName"
                            value={prospectDetails.ownerLastName}
                            onChange={handleInputChange}
                            placeholder="Owner Last Name"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPropertyAddress" className="form-label mt-4">Property Address</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputPropertyAddress" 
                            name="propertyAddress"
                            value={prospectDetails.propertyAddress}
                            onChange={handleInputChange}
                            placeholder="Property Address"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPropertyCity" className="form-label mt-4">Property City</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputPropertyCity" 
                            name="propertyCity"
                            value={prospectDetails.propertyCity}
                            onChange={handleInputChange}
                            placeholder="Property City"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPropertyState" className="form-label mt-4">Property State</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputPropertyState" 
                            name="propertyState"
                            value={prospectDetails.propertyState}
                            onChange={handleInputChange}
                            placeholder="Property State"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPropertyZip" className="form-label mt-4">Property Zip Code</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputPropertyZip" 
                            name="propertyZipcode"
                            value={prospectDetails.propertyZipcode}
                            onChange={handleInputChange}
                            placeholder="Property Zip Code"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPropertyCounty" className="form-label mt-4">Property County</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputPropertyCounty" 
                            name="propertyCounty"
                            value={prospectDetails.propertyCounty}
                            onChange={handleInputChange}
                            placeholder="Property County"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputMailAddress" className="form-label mt-4">Mailing Address</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputMailAddress" 
                            name="mailingAddress"
                            value={prospectDetails.mailingAddress}
                            onChange={handleInputChange}
                            placeholder="Mailing Address"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputMailCity" className="form-label mt-4">Mailing City</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputMailCity" 
                            name="mailingCity"
                            value={prospectDetails.mailingCity}
                            onChange={handleInputChange}
                            placeholder="Mailing City"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputMailState" className="form-label mt-4">Mailing State</label>
                    <input  type="text" 
                            className="form-control" 
                            id="inputMailState" 
                            name="mailingState"
                            value={prospectDetails.mailingState}
                            onChange={handleInputChange}
                            placeholder="Mailing State"
                            required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingZipcode" className="form-label mt-4">Mailing Zip Code</label>
                    <input  type="text" 
                            className="form-control" 
                            id="mailingZipcode" 
                            name="mailingZipcode"
                            value={prospectDetails.mailingZipcode}
                            onChange={handleInputChange}
                            placeholder="Mailing Zip Code"
                            required
                    />
                </div>
                <input  type="submit"
                        value="Add Prospect"
                        className="btn btn-info my-4"/>
            </form>   
        </>
    );
}; 

export default CreateProspect;