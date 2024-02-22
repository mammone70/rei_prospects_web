import React from 'react'

export default function TagCountInput({minTagCount, maxTagCount, onChange}) {
  return (
    <div className="md:flex md:items-center mb-6 mt-6">
        <div className="md:w-3/12">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="minTagCount">
                Tag Count Between
            </label>
        </div>
        <div className="items-center md:flex justify-between md:w-6/12 text-black">
            <input
                type="text"
                name="minTagCount"
                id="minTagCount"
                className="form-control my-2 w-16"
                placeholder="Min"
                value={minTagCount}
                onChange={onChange}
            />
            <p className="block text-gray-500 font-bold md:text-center align-baseline"> And </p>
            <input
                type="text"
                name="maxTagCount"
                id="maxTagCount"
                className="form-control my-2 w-16"
                placeholder="Max"
                value={maxTagCount}
                onChange={onChange}
            />
        </div>
    </div>
  )
}
