import React, { useEffect, useState } from 'react'

const CSVUpload = props => {
    const [loading, setLoading] = useState(false);
    const [prospectFields, setProspectFields] = useState([]);
    
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
        }, []);

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
        fileReader.onload = function (event) {
            const csvOutput = event.target.result;
        };

        fileReader.readAsText(file);
        }
    };
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Import CSV Prospect File</h1>
            <form>
                <input 
                    type={"file"} 
                    accept={".csv"} 
                    onChange={handleOnChange}
                    id={"csvFileInput"}
                    />
                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}>
                    Import CSV
                </button>
            </form>
        </div>
    )
}

export default CSVUpload