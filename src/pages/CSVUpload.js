import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import CSVUploadForm from '../components/CSVUploadForm';

const CSVUpload = props => {
    const [loading, setLoading] = useState(false);
    const [prospectFields, setProspectFields] = useState([]);


    useEffect(() => {
        const fetchFieldMap = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/CSVUpload/FieldMapping`, 
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            const result = await res.json();
            if (!result.error) {
              setProspectFields(result.data);
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }
            } catch (err) {
                console.log(err);
            }
        };

        //TODO cache this
        fetchFieldMap();

    
        }, []);


    return (
      <>
        {loading ? (
          <Spinner splash="Loading Prospect Fields..." />
        ) : (
          <>
            <CSVUploadForm prospectFields={prospectFields}/>
          </>
        )}
      </>
    );
}

export default CSVUpload