'use client'

import { useContext, useState } from 'react'
import { motion } from 'framer-motion'

// import { z } from 'zod'
// import { FormDataSchema } from '@/lib/schema'
// import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import ToastContext from '../context/ToastContext'

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
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    { 
        id: 'Step 3', 
        name: 'Select List and Tags'    
    },
    { 
        id: 'Step 4', 
        name: 'Completion'    
    },
]

export default function CSVUploadForm({prospectFields}) {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    const [file, setFile] = useState();
    const [csvHeaders, setCsvHeaders] = useState([]);
    const fileReader = new FileReader();

    const {toast} = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors }
  } = useForm();
//   } = useForm<Inputs>({
//     resolver: zodResolver(FormDataSchema)
//   })

//   const processForm: SubmitHandler<Inputs> = data => {
    const processForm = data => {
        console.log(data)
        reset()
    }

//   type FieldName = keyof Inputs

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
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  const handleFileChange = (e) => {
    // console.log(prospectFields);

    const file = e.target.files[0];
    setFile(file);

    if (file) {
        fileReader.onload = function (event) {
            const text = event.target.result;
            
            const csvHeaders = text.slice(0, text.indexOf("\n")).split(",");
            setCsvHeaders(csvHeaders);
            // console.log(csvHeaders);

            // const csvRows = text.slice(text.indexOf("\n") + 1).split("\n");
            // console.log(csvRows);

            next();
        }

        fileReader.onerror = function (event) {
            toast.error("Unable to load .csv file headers.");
            setFile(null);
        };

        fileReader.readAsText(file);
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
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

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
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
                    {...register('fileName')}
                    onChange={handleFileChange}
                    // autoComplete='given-name'
                    // className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    // className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'                
                    className=  'block w-full text-sm text-gray-500 bg-gray-50 border-gray-300 rounded-lg
                                file:me-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-sky-600 file:text-white
                                hover:file:bg-blue-700
                                file:disabled:opacity-50 file:disabled:pointer-events-none
                                dark:file:bg-blue-500
                                dark:hover:file:bg-blue-400'
                  />
                  {/* {errors.fileName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.fileName.message}
                    </p>
                  )} */}
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
                Map File Headers
            </h2>
            <p className='mt-1 text-base leading-6 text-gray-600'>
                Map .csv file headers to Prospect fields.
            </p>
            
                {csvHeaders.map((header, index) => (
                    <>
                        <div class="md:flex md:items-center mb-6 mt-6">
                            <div class="md:w-1/2">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for={index}>
                                    {header}
                                </label>
                            </div>
                            <div class="md:w-1/2">
                                <select class="block appearance-none w-48 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id={index}>
                                    <option value=""></option>
                                    {prospectFields.map((prospectField, index) => (
                                        <>
                                            <option value={prospectField.fieldName}>
                                                {
                                                    prospectField.required ? (
                                                        `${prospectField.displayName}*`
                                                    ) :(
                                                        prospectField.displayName
                                                    )
                                                }
                                            </option>
                                        </>     
                                    ))}
                                </select>    
                            </div>
                        </div>
                    </>
                ))}
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

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
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
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
    </section>
  )
}