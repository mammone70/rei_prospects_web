import React, { useContext, useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import Spinner from '../Spinner';
import ToastContext from '../../context/ToastContext';

export default function TagsCreatableSelect({formHook, currentTags, handleChangeTags}) {
    const {toast} = useContext(ToastContext);
    const [prospectTags, setProspectTags] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
          setLoading(true);
          try {
                const queryString = new URLSearchParams({
                    limit: 1000,
                }).toString();

                const res = await fetch(
                    `${process.env.REACT_APP_API_SERVER_URL}/ProspectTags?${queryString}`, 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    
                });
                const result = await res.json();
                if (!result.error) {
                    setProspectTags(result.data);
                    setLoading(false);
                } else {
                    console.log(result);
                    setLoading(false);
                }
          } catch (err) {
              console.log(err);
          }
      };
      fetchTags();
    }, []);
  
    const handleCreateTag = async (newTag) => {
        newTag = newTag.toUpperCase();
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER_URL}/ProspectTags`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }, 
            body: JSON.stringify({name:newTag})
        });

        const result = await res.json();
        if(!result.error){
            toast.success(`${newTag} added.`)
            setProspectTags((prev) => [...prev, result.data]);
        } else {
            toast.error(result.error);
        }
    };

    return (
        <>
            {loading ? (
                <Spinner splash="Loading Tags..." />
            ) : (
                <div className="md:flex md:items-center mb-6 mt-6">
                    <div className="md:w-3/12">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="tags">
                            Tags
                        </label>
                    </div>
                    <div className="md:w-6/12 text-black">
                        <CreatableSelect
                            isMulti
                            defaultValue={currentTags.map(
                                currentValue => {
                                    return {
                                        value:currentValue._id,
                                        label:currentValue.name
                                    };
                                }
                            )}
                            name="tags"
                            options={prospectTags.map(
                                prospectTag => {
                                return {
                                    value:prospectTag._id,
                                    label:prospectTag.name,
                                };
                                }
                            )}
                            closeMenuOnScroll={false}
                            closeMenuOnSelect={true}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Tags"
                            onCreateOption={handleCreateTag}
                            onChange={handleChangeTags}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
