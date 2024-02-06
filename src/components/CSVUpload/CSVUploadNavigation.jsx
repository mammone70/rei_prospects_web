import React from 'react'

export default function CSVUploadNavigation({steps, 
                                            currentStep, 
                                            setPreviousStep,
                                            setCurrentStep,
                                            formHook,
                                            processForm}) {
    const next = async () => {
        const fields = steps[currentStep].fields;
        // const output = await trigger(fields as FieldName[], { shouldFocus: true })
        const output = await formHook.trigger(fields, { shouldFocus: true })
    
        if (!output) return
        
        if (currentStep < steps.length - 1) {
          // if (currentStep === steps.length - 2) {
          //   await handleSubmit(processForm)()
          // }
          setPreviousStep(currentStep)
          setCurrentStep(step => step + 1)
          // nextButtonDisabledCheck();
        }
      }
    
      const prev = () => {
        if (currentStep > 0) {
          setPreviousStep(currentStep)
          setCurrentStep(step => step - 1)
          // nextButtonDisabledCheck();
        }
      }
    
    return (
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
            {/* {(csvUploadFields.file) && <p>{csvUploadFields.file.name}</p>} */}
            {(formHook.getValues('fileName')) && <p>{formHook.getValues('fileName')[0]?.name}</p>}
            <button 
                type="button" 
                className='btn btn-outline-primary px-2 py-1'
                disabled={!formHook.formState.isValid}
                onClick={formHook.handleSubmit(processForm)}
            >
                Upload
            </button>
            <button
                type='button'
                onClick={next}
                /*disabled={nextButtonDisabled}*/
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
    )
}