import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import ListsTagsContainer from "../components/ListsAndTags/ListsTagsContainer";

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

        const [tagsAndLists, setTagsAndLists] = useState({
          tags: [],
          lists: []
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

      // setTagsAndLists({
      //   tags: [],
      //   lists: [],
      // });

      navigate("/prospects");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchData = async() => {
        setLoading(true);
        try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const result = await res.json();
        setProspectDetails({ 
          ownerFirstName: result.data.ownerFirstName,
          ownerLastName: result.data.ownerLastName, 
          propertyAddress: result.data.propertyAddress,
          propertyCity: result.data.propertyCity,
          propertyState: result.data.propertyState,
          propertyZipcode: result.data.propertyZipcode,
          propertyCounty: result.data.propertyCounty,
          mailingAddress: result.data.mailingAddress,
          mailingCity: result.data.mailingCity,
          mailingState: result.data.mailingState,
          mailingZipcode: result.data.mailingZipcode,
        });

        setTagsAndLists({
          lists: result.data.lists,
          tags: result.data.tags, 
        });
        
        setLoading(false);
        } catch (err) {
          console.log(err);
        }
    };
    fetchData();
  }, [id]);

  const handleChangeTags = async (newValue, actionMeta) => {
    switch(actionMeta.action){
      case "select-option":
        // add List (option) to prospect
        try {
          const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects/${id}/ProspectTags/${actionMeta.option.value}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
          const result = await res.json();
          
        } catch (err) {
          console.log(err);
        }    
        break;
      case "remove-value":
        // remove List (removedValue) from prospect
        try {
          const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects/${id}/ProspectTags/${actionMeta.removedValue.value}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
          const result = await res.json();
          
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        //shouldn't happen
        console.log(actionMeta);
    }
    // console.log(tagsAndLists.lists);
    setTagsAndLists({ ...tagsAndLists, tags: newValue });
  };
    
  const handleChangeLists = async (newValue, actionMeta) => {
    switch(actionMeta.action){
      case "select-option":
        // add List (option) to prospect
        try {
          const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects/${id}/ProspectLists/${actionMeta.option.value}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
          const result = await res.json();
          
        } catch (err) {
          console.log(err);
        }    
        break;
      case "remove-value":
        // remove List (removedValue) from prospect
        try {
          const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects/${id}/ProspectLists/${actionMeta.removedValue.value}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
          const result = await res.json();
          
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        //shouldn't happen
        console.log(actionMeta);
    }
    // console.log(tagsAndLists.lists);
    setTagsAndLists({ ...tagsAndLists, lists: newValue });
  };

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
            <ListsTagsContainer 
              currentLists={tagsAndLists.lists}
              currentTags={tagsAndLists.tags}
              handleChangeLists={handleChangeLists}
              handleChangeTags={handleChangeTags}
            />
        </>
      )}
    </>
  );
};

export default EditProspect;