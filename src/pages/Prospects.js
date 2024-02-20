import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalTitle from 'react-bootstrap/ModalTitle'
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const Prospects = () => {
    const { toast } = useContext(ToastContext);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [prospects, setProspects] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const prospectFields = [
        {
            fieldName: "ownerFirstName",
            fieldLabel:"Owner's First Name",
        },
        {
            fieldName: "ownerLastName",
            fieldLabel:"Owner's Last Name",
        },
        {
            fieldName: "propertyAddress",
            fieldLabel:"Property Address",
        },
        {
            fieldName: "propertyCity",
            fieldLabel:"Property City",
        },
        {
            fieldName: "propertyState",
            fieldLabel:"Property State",
        },
        {
            fieldName: "propertyZipcode",
            fieldLabel:"Property Zipcode",
        },
        {
            fieldName: "propertyCounty",
            fieldLabel:"Property County",
        },
        {
            fieldName: "mailingAddress",
            fieldLabel:"Mailing Address",
        },
        {
            fieldName: "mailingCity",
            fieldLabel:"Mailing City",
        },
        {
            fieldName: "mailingState",
            fieldLabel:"Mailing State",
        },
        {
            fieldName: "mailingZipcode",
            fieldLabel:"Mailing Zipcode",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects?${new URLSearchParams({
                limit: 25
              })}`, 
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
      
                query: {
                  limit : 25,
                },
            });
            const result = await res.json();
            if (!result.error) {
                setProspects(result.data);
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }
            } catch (err) {
            console.log(err);
            }
        };
        fetchData();
      }, []);
    
      const deleteProspect = async (id) => {
        if (window.confirm("Are you sure you want to delete this prospect?")) {
          try {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospect/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const result = await res.json();
            if (!result.error) {
              setProspects(result.prospects);
              toast.success("Deleted prospect");
              setShowModal(false);
            } else {
              toast.error(result.error);
            }
          } catch (err) {
            console.log(err);
          }
        }
      };
    
      const handleSearchSubmit = (event) => {
        event.preventDefault();
    
        const newSearchProspects = prospects.filter((prospect) =>
          prospect.formattedPropertyAddress.toLowerCase().includes(searchInput.toLowerCase())
        );
        //console.log(newSearchUser);
        setProspects(newSearchProspects);
      };
    
      return (
        <>                                                                                 
          <div>
            <h1>Prospects</h1>
            <a href="/prospects" className="btn btn-danger my-2">
              Reload Prospects
            </a>
            <hr className="my-4" />
            {loading ? (
              <Spinner splash="Loading Prospects..." />
            ) : (
              <>
                {prospects.length === 0 ? (
                  <h3>No prospects created yet</h3>
                ) : (
                  <>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                      <input
                        type="text"
                        name="searchInput"
                        id="searchInput"
                        className="form-control my-2"
                        placeholder="Search Prospect"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button type="submit" className="btn btn-info mx-2">
                        Search
                      </button>
                    </form>
    
                    <p>
                      Total Prospects: <strong>{prospects.length}</strong>
                    </p>
                    <table className="table table-hover">
                      <thead>
                        <tr className="table-primary">
                          <th scope="col">Owner</th>
                          <th scope="col">Property Address</th>
                          {/* <th scope="col">Link</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {prospects.map((prospect, index) => (
                          <tr
                            key={prospect._id}
                            className={
                                index % 2 === 0 ? 
                                "table-dark" :
                                "table-light"
                            }
                          >
                            <th scope="row"
                              onClick={() => {
                              setModalData({});
                              setModalData(prospect);
                              setShowModal(true);
                            }}>
                              {prospect.ownerFirstName} {prospect.ownerLastName}
                            </th>
                            <td
                              onClick={() => {
                              setModalData({});
                              setModalData(prospect);
                              setShowModal(true);
                            }}>
                              {prospect.propertyAddress} {prospect.propertyCity}, {prospect.propertyState} {prospect.propertyZipcode}
                            </td>
                            {/* <td>
                              <a 
                                href={prospectInfoLinkTemplate + prospect._id}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img src="./link.png" alt="Link"/>
                              </a>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
          <Modal size="l" show={showModal} onHide={() => setShowModal(false)}>
            <ModalHeader closeButton>
              <ModalTitle>{modalData.propertyFullAddress}</ModalTitle>
            </ModalHeader>
        
            <ModalBody>
              <div>
                <h3>{modalData.ownerFullName}</h3>
                <div style={{height:'350px', overflow:'auto'}}>
                  <table className="table table-hover">
                        <tbody>
                            {prospectFields.map((prospectField, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index % 2 === 0 ? 
                                        "table-primary" :
                                        "table-light"
                                    }
                                >
                                    <td>{prospectField.fieldLabel}</td>
                                    <td>{modalData[prospectField.fieldName]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
                </div>
            </ModalBody>
    
            <ModalFooter>
              <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteProspect(modalData._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </ModalFooter>
          </Modal>
        </>
      );
    };
    
    export default Prospects;