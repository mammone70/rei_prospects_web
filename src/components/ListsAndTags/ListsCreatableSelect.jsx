import React, { useContext, useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import Spinner from '../Spinner';
import ToastContext from '../../context/ToastContext';

export default function ListsCreatableSelect( {formHook, currentLists, handleChangeLists} ) {
    const {toast} = useContext(ToastContext);
    const [prospectLists, setProspectLists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLists = async () => {
          setLoading(true);
          try {
                const queryString = new URLSearchParams({
                    limit: 1000,
                }).toString();
                
                const res = await fetch(
                    `${process.env.REACT_APP_API_SERVER_URL}/ProspectLists?${queryString}`, 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    
                });
                const result = await res.json();
                if (!result.error) {
                    setProspectLists(result.data);
                    setLoading(false);
                } else {
                    console.log(result);
                    setLoading(false);
                }
          } catch (err) {
              console.log(err);
          }
      };
      fetchLists();
    }, []);
  
    const handleCreateList = async (newList) => {
        newList = newList.toUpperCase();
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER_URL}/ProspectLists`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }, 
            body: JSON.stringify({name:newList})
        });

        const result = await res.json();
        if(!result.error){
            toast.success(`${newList} added.`)
            setProspectLists((prev) => [...prev, result.data]);
        } else {
            toast.error(result.error);
        }
    };
    
    return (
        <>
            {loading ? (
                <Spinner splash="Loading Lists..." />
            ) : (
                <div className="md:flex md:items-center mb-6 mt-6">
                    <div className="md:w-3/12">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="lists">
                            Lists
                        </label>
                    </div>
                    <div className="md:w-6/12 text-black">
                        <CreatableSelect
                            isMulti
                            defaultValue={currentLists?.map(
                                currentValue => {
                                    return {
                                        value:currentValue._id,
                                        label:currentValue.name
                                    };
                                }
                            )}
                            name='lists'
                            options={prospectLists.map(
                                prospectList => {
                                    return {
                                        value:prospectList._id,
                                        label:prospectList.name,
                                    };
                                }
                            )}
                            closeMenuOnScroll={false}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Lists"
                            onCreateOption={handleCreateList}
                            onChange={handleChangeLists}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
