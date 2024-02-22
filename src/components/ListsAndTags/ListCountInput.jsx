import React from 'react'

export default function ListCountInput({minListCount, maxListCount, onChange}) {
  return (
    <div className="md:flex md:items-center mb-6 mt-6">
        <div className="md:w-3/12">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="minListCount">
                List Count Between
            </label>
        </div>
        <div className="items-center md:flex justify-between md:w-6/12 text-black">
            <input
                type="text"
                name="minListCount"
                id="minListCount"
                className="form-control my-2 w-16"
                placeholder="Min"
                value={minListCount}
                onChange={onChange}
            />
            <p className="block text-gray-500 font-bold md:text-center align-baseline"> And </p>
            <input
                type="text"
                name="maxListCount"
                id="maxListCount"
                className="form-control my-2 w-16"
                placeholder="Max"
                value={maxListCount}
                onChange={onChange}
            />
        </div>
    </div>
  )
}
