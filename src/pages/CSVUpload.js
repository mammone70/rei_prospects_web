'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import CSVUploadSteps from '../components/CSVUpload/CSVUploadSteps'
import CSVUploadNavigation from '../components/CSVUpload/CSVUploadNavigation'
import CSVUploadForm from '../components/CSVUploadForm'


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

  const formHook = useForm({ 
                shouldUseNativeValidation:true,
                mode: "all",
                defaultValues: {
                  fileName: ''
                }
              }
      );

    const processForm = data => {
        console.log(data)
        console.log(formHook.formState.isValid)
        // reset()
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