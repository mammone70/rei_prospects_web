import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalTitle from 'react-bootstrap/ModalTitle'
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import { Pagination } from "@mui/material";
import ProspectFilter from "../components/ProspectFilter";

const Prospects = () => {
    const { toast } = useContext(ToastContext);

    const [showProspectModal, setShowProspectModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prospectModalData, setProspectModalData] = useState({});
    const [prospects, setProspects] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [prospectsPerPage, setProspectsPerPage] = useState(25);
    
    const [filterProps, setFilterProps] = useState({
      lists:[],
      tags:[],
      minListCount: 0,
      maxListCount: "",
      minTagCount: 0,
      maxTagCount: "",
    });

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
            // const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects?${new URLSearchParams({
            //     limit: 25
            //   })}`,
              const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/Prospects`,   
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                // query: {
                //   limit : 25,
                // },
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
              setShowProspectModal(false);
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
    
      const indexOfLastProspect = currentPage * prospectsPerPage;
      const indexOfFirstProspect = indexOfLastProspect - prospectsPerPage;
      const searchProspects = 
        prospects
          .filter(
            (prospect) => {
              return  searchInput === '' 
                      ? 
                        prospect 
                      : 
                        prospect.formattedPropertyAddress?.toLowerCase().includes(searchInput.toLowerCase())
                      ||
                        prospect.ownerFirstName.toLowerCase().includes(searchInput.toLowerCase())
                      ||
                        prospect.ownerLastName.toLowerCase().includes(searchInput.toLowerCase());
            })
      const currentPageProspects = searchProspects.slice(indexOfFirstProspect, indexOfLastProspect);
      const paginate = 
        (event, pageNumber) => {
          setCurrentPage(pageNumber);

        };
      const numberOfPages = Math.ceil(searchProspects.length / prospectsPerPage);
      
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name + "," + value);
        setFilterProps({ ...filterProps, [name]: value });
      };

      const handleChangeTags = async (newValue, actionMeta) => {
        setFilterProps({ ...filterProps, tags: newValue });
      };

      const handleChangeLists = async (newValue, actionMeta) => {
        setFilterProps({ ...filterProps, lists: newValue });
      };

      const handleFilterSubmit = (event) => {
        event.preventDefault();
        console.log(filterProps);
      }

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
                  {/* <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button> */}
                </form>

                {searchProspects.length === 0 ? (
                  <h3>No Prospects!</h3>
                ) : (
                  <>
                    <div>
                      <p>
                        Total Prospects: <strong>{searchProspects.length}</strong>
                      </p>
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => {
                          setShowFilterModal(true);             
                        }}
                      >
                        Filter
                      </button>
                      <Pagination 
                        count={numberOfPages} 
                        page={currentPage}
                        onChange={paginate}
                        showFirstButton 
                        showLastButton
                        // siblingCount={2}
                        // boundaryCount={2}
                        color="primary"
                        sx={{button:{color: '#ffffff'}}}
                        // size="large"
                      />
                    </div>
                    <table className="table table-hover">
                      <thead>
                        <tr className="table-primary">
                          <th scope="col">Owner</th>
                          <th scope="col">Property Address</th>
                          {/* <th scope="col">Link</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageProspects
                          .map((prospect, index) => (
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
                                setProspectModalData({});
                                setProspectModalData(prospect);
                                setShowProspectModal(true);
                              }}>
                                {prospect.ownerFirstName} {prospect.ownerLastName}
                              </th>
                              <td
                                onClick={() => {
                                setProspectModalData({});
                                setProspectModalData(prospect);
                                setShowProspectModal(true);             
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

          {/* Prospect Modal */}
          <Modal size="l" show={showProspectModal} onHide={() => setShowProspectModal(false)}>
            <ModalHeader closeButton>
              <ModalTitle>{prospectModalData.propertyFullAddress}</ModalTitle>
            </ModalHeader>
        
            <ModalBody>
              <div>
                <h3>{prospectModalData.ownerFullName}</h3>
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
                                    <td>{prospectModalData[prospectField.fieldName]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
                </div>
            </ModalBody>
    
            <ModalFooter>
              <Link className="btn btn-info" to={`/edit/${prospectModalData._id}`}>
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteProspect(prospectModalData._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setShowProspectModal(false)}
              >
                Close
              </button>
            </ModalFooter>
          </Modal>

          {/* Filter Modal */}
          <Modal size="l" show={showFilterModal} onHide={() => setShowFilterModal(false)}>
            <ModalHeader closeButton>
              <ModalTitle>Filter Prospects</ModalTitle>
            </ModalHeader>
        
            <ModalBody>
              <div>
                <form onSubmit={handleFilterSubmit}>
                  <ProspectFilter
                    filterProps={filterProps}
                    onListCountInputChange={handleInputChange}
                    onTagCountInputChange={handleInputChange}
                    onChangeLists={handleChangeLists}
                    onChangeTags={handleChangeTags}
                  />
                  <button
                    className="btn btn-info"
                    type="submit"
                  >
                    Filter
                  </button>
                </form>
              </div>
            </ModalBody>
    
            <ModalFooter>
              <button
                className="btn btn-warning"
                onClick={() => setShowFilterModal(false)}
              >
                Close
              </button>
            </ModalFooter>
          </Modal>
        </>
      );
    };
    
    export default Prospects;