'use client'

import { useContext, useEffect, useState } from 'react'

// import { z } from 'zod'
// import { FormDataSchema } from '@/lib/schema'
// import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import ToastContext from '../context/ToastContext'

import CSVUploadSteps from './CSVUpload/CSVUploadSteps'
import CSVUploadNavigation from './CSVUpload/CSVUploadNavigation'


const steps = [
    {
        id: 'Step 1',
        name: 'Choose .csv File to Upload.',
        fields: ['fileName'],
        component: 'CSVUploadFileSelect'
    },
    {
        id: 'Step 2',
        name: 'Map .csv Headers',
        fields: 'csvFieldMapping',
        component: 'CSVUploadFieldMapping'
    },
    { 
        id: 'Step 3',
        name: 'Lists & Tags', 
        fields: ['lists', 'tags'],
        component: 'CSVUploadListsTags'   
    },
    { 
        id: 'Step 4', 
        name: 'Completion',
        component:'CSVUploadCompletion'   
    },
]

var requiredProspectFields = {};
var allRequiredFieldsMapped = false;

export default function CSVUpload() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  
  
  const [prospectFieldsOptions, setProspectFieldsOptions] = useState([]);

  const [csvUploadFields, setcsvUploadFields] = useState({
    file: null,
    csvHeaderMappings: {},
    tags: [],
    lists: [],
  });
  
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);

  const {toast} = useContext(ToastContext);

  const formHook = useForm({ 
                shouldUseNativeValidation:true,
                mode: "all",
                defaultValues: {
                  fileName: ''
                }
              }
      );
//   } = useForm<Inputs>({
//     resolver: zodResolver(FormDataSchema)
//   })

              

//   type FieldName = keyof Inputs

  
    
  

  const nextButtonDisabledCheck = () => {
    if (currentStep === steps.length - 1) return true; 

    switch (currentStep) {
      case 0: 
        //file select
        //make sure we have a valid file
        setNextButtonDisabled((csvUploadFields.file) ? false : true);
        break;
      case 1:
      //field map
        setNextButtonDisabled(!allRequiredFieldsMapped);
        // setNextButtonDisabled(false);
        break;
      case 2:
      //Lists and Tags
      setNextButtonDisabled(true);

      break;
      default:
      //should never happen
      break;
    }
  }

  const checkUploadButtonDisabled = () => {
    setUploadButtonDisabled(!(allRequiredFieldsMapped && csvUploadFields.file));  
  }
  
  const handleFieldMapChange = (e, newValue, prospectField) => {
    console.log(newValue)
    console.log(prospectField)
    setValue(`${prospectField.fieldName}`, newValue?.value, { shouldValidate: true })
    nextButtonDisabledCheck();
    // 
    // console.log(v)
    // console.log(prospectField)
    
    // let headerSelectName = prospectField;
    // const newProspectField = (v) ? v.value : "";

    // //create an object to contain updated csv header properties
    // let updatedHeaderMappings = {[headerSelectName]: newProspectField};

    // //see if header was previously mapped to a required field
    // var oldRequiredField = 
    //   Object.keys(requiredProspectFields).find( key => 
    //     requiredProspectFields[key] === headerSelectName
    //   );

    // if(newProspectField && (newProspectField in requiredProspectFields)){
    //   //if header was previously mapped, reset the old header mapping AND set new prospect field mapping
    //   if(oldRequiredField){
    //     // setRequiredProspectFields({...requiredProspectFields, [newProspectField]: e.target.name, [oldRequiredField] : ""});
    //     requiredProspectFields = {...requiredProspectFields, [newProspectField]: headerSelectName, [oldRequiredField] : ""};
    //   }
    //   else {
    //     // setRequiredProspectFields({...requiredProspectFields, [newProspectField]: e.target.name});
    //     requiredProspectFields = {...requiredProspectFields, [newProspectField]: headerSelectName};
    //   }
    // }
    // //if header was previously mapped, reset the old header mapping
    // else if(oldRequiredField) {
    //   // setRequiredProspectFields({...requiredProspectFields, [oldRequiredField] : ""});
    //   requiredProspectFields = {...requiredProspectFields, [oldRequiredField] : ""};
    // }
        
    // //if value of changed header mapping is not nothing/null
    // if(newProspectField) {
    //   //iterate through all of the mapping inputs
    //   for(const [currentHeaderSelect, currentProspectField] of Object.entries(csvUploadFields.csvHeaderMappings)){
    //     //skip this event handlers mapping input
    //     if(currentHeaderSelect === headerSelectName) continue;

    //     //if header mapping destination field is equal to this events destination field
    //     if(currentProspectField === newProspectField){
    //       //change header mapping destination field to nothing/empty
    //       updatedHeaderMappings[currentHeaderSelect] = "";

    //       //should be able to break the for loop becuase there should never be
    //       //more than one Select Box with a given destination field
    //       break;
    //     }
    //   }
    // }

    // //update csv header state
    // setcsvUploadFields(
    //   {
    //     ...csvUploadFields,
    //     csvHeaderMappings : 
    //     {
    //       ...csvUploadFields.csvHeaderMappings,
    //       ...updatedHeaderMappings,
    //     }
    //   }
    // );

    // checkAllRequiredFieldsMapped();
    // checkUploadButtonDisabled();
    nextButtonDisabledCheck();
  }

  const checkAllRequiredFieldsMapped = () => {
    allRequiredFieldsMapped = !Object.values(requiredProspectFields).includes("");
  }

  
  return (
    <section className='absolute inset-0 flex flex-col justify-between px-24 pt-24 pb-6'>
      {/* Steps */}
      <CSVUploadSteps steps={steps} currentStep={currentStep}/>
      
      {/* Navigation */}
      <CSVUploadNavigation
        steps={steps}
        currentStep={currentStep}
        setPreviousStep={setPreviousStep}
        setCurrentStep={setCurrentStep}
        formHook={formHook}
        processForm={processForm}
      />

      {/* Form */}
      
    </section>
  )
}