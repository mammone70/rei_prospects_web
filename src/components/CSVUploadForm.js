'use client'

import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// import { z } from 'zod'
// import { FormDataSchema } from '@/lib/schema'
// import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import ToastContext from '../context/ToastContext'

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { Autocomplete, TextField } from '@mui/material'

// type Inputs = z.infer<typeof FormDataSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Choose .csv File to Upload.',
        fields: ['fileName']
    },
    {
        id: 'Step 2',
        name: 'Map .csv Headers',
        fields: []
    },
    { 
        id: 'Step 3',
        name: 'Lists & Tags', 
        fields: ['lists', 'tags']    
    },
    { 
        id: 'Step 4', 
        name: 'Completion'    
    },
]

var requiredProspectFields = {};
var allRequiredFieldsMapped = false;

export default function CSVUploadForm() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const [csvHeaders, setCsvHeaders] = useState([]);
  const fileReader = new FileReader();

  const [loading, setLoading] = useState(false);
  
  const [prospectFields, setProspectFields] = useState([]);
  const [prospectLists, setProspectLists] = useState([]);
  const [prospectTags, setProspectTags] = useState([]);

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

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    setValue,
    // formState: { errors, isValid }
    formState
  } = useForm({ 
                shouldUseNativeValidation:true,
                mode: "all"
              }
      );
//   } = useForm<Inputs>({
//     resolver: zodResolver(FormDataSchema)
//   })

    const processForm = data => {
        console.log(data)

        // reset()
    }

//   type FieldName = keyof Inputs

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
                  setProspectFieldsOptions(
                    result.data.map(
                      (prospectField) => {
                        return {
                          // header: header,
                          value:prospectField.fieldName,
                          label:prospectField.required ? (
                                    `${prospectField.displayName}*`
                                  ) :(
                                    prospectField.displayName
                                  )
                        };
                      }
                    )
                  );
                  //extract separate list of required fields
                  for(let prospectField of result.data){
                    if(prospectField.required){
                      requiredProspectFields[prospectField.fieldName] = "";
                    }
                  }
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

    useEffect(() => {
      const fetchLists = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/ProspectLists`, 
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

  useEffect(() => {
    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/ProspectTags`, 
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

  const next = async () => {
    const fields = steps[currentStep].fields;
    // const output = await trigger(fields as FieldName[], { shouldFocus: true })
    const output = await trigger(fields, { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
      nextButtonDisabledCheck();
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
      nextButtonDisabledCheck();
    }
  }

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    
    if (file) {
        fileReader.onload = function (event) {
            const text = event.target.result;
            
            setCsvHeaders(text.slice(0, text.indexOf("\n")).split(","));
            
            //new file, new header mappings
            // let csvHeaderMappings = {};
            // for(let csvHeader of csvHeaders){
            //   csvHeaderMappings[csvHeader] = '';
            // }

            setcsvUploadFields(
              {
                ...csvUploadFields, 
                file: file,
              }
            );
            checkUploadButtonDisabled();
            next();
        }

        fileReader.onerror = function (event) {
            toast.error("Unable to load .csv file headers.");
            setcsvUploadFields(
              {
                ...csvUploadFields, 
                file: null, 
                csvHeaderMappings: []
              }
            );
        };

        fileReader.readAsText(file);
    }
  }
  
  const handleFieldMapChange = (e, newValue, prospectField) => {
    console.log(newValue)
    console.log(prospectField)
    setValue(`${prospectField.fieldName}`, newValue?.value, { shouldValidate: true })
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

  const handleCreateTag = async (newTag) => {
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

  const handleChangeLists = (newValue, actionMeta) => {
    setcsvUploadFields(
      {
        ...csvUploadFields,
        lists: newValue,
      }
    )
  };

  const handleChangeTags = (newValue, actionMeta) => {
    setcsvUploadFields(
      {
        ...csvUploadFields,
        tags: newValue,
      }
    )
  };

  const handleCreateList = async (newList) => {
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
    <section className='absolute inset-0 flex flex-col justify-between px-24 pt-24 pb-6'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          {(csvUploadFields.file) && <p>{csvUploadFields.file.name}</p>}
          <button 
            type="button" 
            className='btn btn-outline-primary px-2 py-1'
            disabled={!formState.isValid}
            onClick={handleSubmit(processForm)}
          >
              Upload
          </button>
          <button
            type='button'
            onClick={next}
            disabled={nextButtonDisabled}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
          </div>
        </div>
      {/* Form */}
      <form className='mt-12 py-12 overflow-auto' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7'>
              Select .csv File
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Choose file from local hard drive.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                    htmlFor='fileName'
                //   className='block text-sm font-medium leading-6 text-gray-200'
                    className='block mb-2 text-sm font-medium text-gray-200 dark:text-white'
                >
                  Choose File
                </label>
                <div className='mt-2'>
                  <input
                    type='file'
                    id='fileName'
                    accept=".csv"
                    {
                      ...register(
                        'fileName',
                        {
                          required: true
                        }
                      )
                    }
                    onChange={handleFileChange}
                    // autoComplete='given-name'
                    // className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    // className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'                
                    className=' block w-full text-sm text-gray-500 bg-gray-50 border-gray-300 rounded-lg file:me-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-sky-600 file:text-white
                                hover:file:bg-blue-700
                                file:disabled:opacity-50 file:disabled:pointer-events-none
                                dark:file:bg-blue-500 dark:hover:file:bg-blue-400'
                  
                    // required="true"
                  />
                  {formState.errors.fileName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {formState.errors.fileName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-lg font-semibold leading-7'>
                Map Fields
            </h2>
            <p className='mt-1 text-base leading-6 text-gray-600'>
                Map .csv file headers to Prospect fields.
            </p>
             {/* <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'> */}
                {
                  prospectFields.map(
                    (prospectField) => (
                      <div key={prospectField.fieldName} className="md:flex md:items-center mb-6 mt-6">
                          <div className="md:w-3/12">
                              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={prospectField.fieldName}>
                                {
                                  prospectField.required ? (
                                      `${prospectField.displayName}*`
                                    ) :(
                                      prospectField.displayName
                                    )
                                }
                              </label>
                          </div>
                          <div className="md:w-6/12">
                              <Autocomplete className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-1 focus:bg-white focus:border-sky-500" 
                                      id={prospectField.fieldName}
                                      key={prospectField.fieldName}
                                      renderInput={(params) => <TextField {...params} label="CSV Header" />}
                                      required={prospectField.required}
                                      // value={
                                      //   csvHeaders.find(
                                      //     (header) => header.value === 
                                      //   )
                                      // }
                                      options={
                                        csvHeaders.map(
                                          (csvHeader) => {
                                            return {
                                              value: csvHeader,
                                              label: csvHeader
                                            };
                                          }
                                        )
                                      }                                    
                                      // isOptionEqualToValue={
                                      //   (option, value) => {
                                      //     return option.value === value.value;
                                      //   } 
                                      // }
                                      {
                                        ...register(
                                          `${prospectField.fieldName}`,
                                          {
                                            required: prospectField.required
                                          }
                                        )
                                      }
                                      onChange={(e, v) => handleFieldMapChange(e,v, prospectField)} 
                              />     
                          </div>
                      </div>
                    )
                  )
                }
                {/* {Object.keys(csvUploadFields.csvHeaderMappings).map((header, index) => (
                  <>
                      <div key={header} className="md:flex md:items-center mb-6 mt-6">
                          <div className="md:w-3/12">
                              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={index}>
                                  {header}
                              </label>
                          </div>
                          <div className="md:w-6/12">
                              <Autocomplete className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-1 focus:bg-white focus:border-sky-500" 
                                      id={header}
                                      key={header}
                                      value={
                                        prospectFieldsOptions.find(
                                          (prospectFieldOption) => 
                                            prospectFieldOption.value === csvUploadFields.csvHeaderMappings[header]
                                        ) || ""
                                      }
                                      renderInput={(params) => <TextField {...params} label="Prospect Field" />}
                                      options={prospectFieldsOptions}                                    
                                      isOptionEqualToValue={
                                        (option, value) => {
                                          return option.value === value.value;
                                        } 
                                      }
                                      {...register(`${header}`)}
                                      onChange={(e, v) => handleFieldMapChange(e,v,header)} 
                              />     
                          </div>
                      </div>
                  </>
              ))} */}
            {/* </div>
          </div> */}
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='md:items-center'>
              <h2 className='text-lg md:items-center font-semibold leading-7'>
                Lists and Tags
              </h2>
              <p className='mt-1 text-base leading-6 text-gray-600'>
                Select Lists and Tags for Prospects
              </p>
            </div>
            <div className="md:flex md:items-center mb-6 mt-6">
              <div className="md:w-3/12">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="lists">
                      Lists
                  </label>
              </div>
              <div className="md:w-6/12 text-black">
              <CreatableSelect
                  isMulti
                  name="lists"
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
                  placeholder=""
                  onCreateOption={handleCreateList}
                  onChange={handleChangeLists}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6 mt-6">
              <div className="md:w-3/12">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="tags">
                      Tags
                  </label>
              </div>
              <div className="md:w-6/12 text-black">
                  <CreatableSelect
                    isMulti
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
                    placeholder=""
                    onCreateOption={handleCreateTag}
                    onChange={handleChangeTags}
                  />
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </section>
  )
}