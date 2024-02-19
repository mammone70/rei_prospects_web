'use client'

import { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'

import CSVUploadSteps from '../components/CSVUpload/CSVUploadSteps'
import CSVUploadNavigation from '../components/CSVUpload/CSVUploadNavigation'
import CSVUploadForm from '../components/CSVUploadForm'
import ToastContext from '../context/ToastContext'


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


export default function CSVUpload() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const {toast} = useContext(ToastContext);

  const formHook = useForm({ 
                shouldUseNativeValidation:true,
                mode: "all",
                defaultValues: {
                  csvFile: ''
                }
              }
      );

    const processForm = async (data, event) => {
        event.preventDefault();
        const formData = new FormData();
        const {csvFile, lists, tags, ...formFields} = data;
        
        // console.log(csvFile);
        // console.log(formFields);
        // console.log(lists);
        // console.log(tags);

        const tagIds = tags.map((tag) => tag.value);
        const listIds = lists.map((list) => list.value);

        formData.append("file", csvFile[0]);
        // formData.append("tagIds", JSON.stringify(tagIds));
        // formData.append("listIds", JSON.stringify(listIds));
        formData.append("tagIds", tagIds);
        formData.append("listIds", listIds);

        for (const [key, value] of Object.entries(formFields)) {
          formData.append(key, value);
        }
        // console.log(formData);
        const res = await fetch(
                `${process.env.REACT_APP_API_SERVER_URL}/CSVUpload`, {
                method: 'POST',
                headers: {
                    // "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }, 
            body: formData,
        });

        const result = await res.json();
        if(!result.error){
            toast.success(`[${csvFile[0].name}] added.`)
            // formHook.reset()
        } else {
            toast.error(result.error);
        }
    }

  return (
    <section className='absolute inset-0 flex flex-col justify-between px-24 pt-24 pb-6'>
      {/* Steps */}
      <CSVUploadSteps
        steps={steps} 
        currentStep={currentStep}
      />
      
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
      <CSVUploadForm
        steps={steps}
        currentStep={currentStep}
        formHook={formHook}
      />
    </section>
  );
};