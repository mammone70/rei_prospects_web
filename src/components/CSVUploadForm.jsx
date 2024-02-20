import React, {useContext, useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import CSVUploadFileSelect from './CSVUpload/CSVUploadFileSelect';
import CSVUploadFieldMapping from './CSVUpload/CSVUploadFieldMapping';
import ToastContext from '../context/ToastContext'
import CSVUploadListsTagsContainer from './ListsAndTags/ListsTagsContainer';

export default function CSVUploadForm({steps,
                                      currentStep,
                                      previousStep,
                                      formHook,
                                      processForm
                                      }) {
  
  const delta = currentStep - previousStep
                                      
  const {toast} = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const [csvHeaders, setCsvHeaders] = useState([]);
  
const [prospectFields, setProspectFields] = useState([]);
const [requiredProspectFields, setRequiredProspectFields] = useState([]);

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
                setRequiredProspectFields(
                  result.data.filter(
                    (prospectField) => prospectField.required
                  )
                )

                //set Prospect fields to Step 1 field for interface nav
                // steps[1].fields = 
                //   result.data.map(
                //     (prospectField) => {
                //       return prospectField.fieldName
                //     }
                //   )
                
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
    fetchFieldMap();
  }, []);

  const fileReader = new FileReader();
  const handleFileChange = (e) => {
    // formHook.setValue("fileName", e.target.files);
    const file = e.target.files[0];
    
    if (file) {
      fileReader.onload = function (event) {
          const text = event.target.result;
          
          setCsvHeaders(text.slice(0, text.indexOf("\n")).split(","));
          
          // checkUploadButtonDisabled();
          // next();
      }

      fileReader.onerror = function (event) {
          toast.error("Unable to load .csv file headers.");
      };

      fileReader.readAsText(file);
    }
  }

  const handleFieldMapChange = (e, newValue, prospectField) => {
    formHook.setValue(`${prospectField.fieldName}`, newValue?.value, { shouldValidate: true })
    
    // nextButtonDisabledCheck();
    // checkUploadButtonDisabled();
    // nextButtonDisabledCheck();
  }

  const handleChangeTags = (newValue, actionMeta) => {
    console.log(newValue);
    formHook?.setValue('tags', newValue);
  };
    
  const handleChangeLists = (newValue, actionMeta) => {
    console.log(newValue);
    formHook?.setValue('lists',newValue);
  };

  return (
    <form className='mt-12 py-12 overflow-auto'>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
            <CSVUploadFileSelect 
              formHook={formHook}
              onFileChange={handleFileChange}
            />
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CSVUploadFieldMapping  formHook={formHook}
                                    csvHeaders={csvHeaders}
                                    prospectFields={prospectFields}
                                    handleFieldMapChange={handleFieldMapChange}
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CSVUploadListsTagsContainer 
              formHook={formHook}
              handleChangeTags={handleChangeTags}
              handleChangeLists={handleChangeLists} 
            />
          </motion.div>
        )}
      </form>
  )
}
