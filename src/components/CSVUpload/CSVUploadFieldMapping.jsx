import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import CSVUploadFieldMappingAutoComplete from './CSVUploadFieldMappingAutoComplete';

export default function CSVUploadFieldMapping({  formHook,
                                                csvHeaders,
                                                prospectFields,
                                                handleFieldMapChange}) {
  return (
    <>
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
                        <CSVUploadFieldMappingAutoComplete 
                            control={formHook.control}
                            label={prospectField.displayName}
                            name={prospectField.fieldName}
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
                            required={prospectField.required}
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
    </>
  )
}
