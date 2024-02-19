import React from 'react'


export default function CSVUploadFileSelect({formHook, onFileChange}) {
    
    return (
        <>
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
                            id='csvFile'
                            accept=".csv"
                            {
                                ...formHook.register('csvFile',
                                {
                                    required: true
                                }
                                )
                            }
                            onChange={onFileChange}
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
                        {formHook.errors?.fileName?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                            {formHook.errors.fileName.message}
                        </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
