import React from 'react'
import { Controller } from 'react-hook-form'
import { Autocomplete } from '@mui/material'
import {TextField} from '@mui/material'

export default function CSVUploadFieldMappingAutoComplete({ name, control, label, options, required }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required
        }
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Autocomplete className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-1 focus:bg-white focus:border-sky-500" 
            renderInput={(params) => <TextField {...params} label={label} />}
            required={required}
            options={options}                                    
            isOptionEqualToValue={
              (option, value) => {
                  return option.value === value;
              } 
            } 
            value={value || null}
            onChange={(event, newValue) => {
                onChange(newValue ? newValue.value : null);
            }}
        />
      )}
    />
  )
}
