import React from 'react'

export default function ListAndTagSearchType({
                            onListSearchTypeInputChange,
                            onTagSearchTypeInputChange}) {
  return (
    <div className="md:flex md:items-center mb-6 mt-6">
        <div className="md:w-3/12">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="listSearchType">
                Lists
            </label>
        </div>
        <div className="items-center md:flex justify-between md:w-6/12 text-black">
        <select
                name="listSearchType"
                id="listSearchType"
                className="form-control my-2 w-16"
                onChange={onListSearchTypeInputChange}
            >
                <option value={"ANY"}>ANY</option>
                <option value={"ALL"}>ALL</option>
            </select>
            <label className="block justify-end text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="listSearchType">
                Tags
            </label>
            <select
                name="tagSearchType"
                id="tagSearchType"
                className="form-control my-2 w-16"
                onChange={onTagSearchTypeInputChange}
            >
                <option value={"ANY"}>ANY</option>
                <option value={"ALL"}>ALL</option>
            </select>
        </div>
    </div> 
    )
}
