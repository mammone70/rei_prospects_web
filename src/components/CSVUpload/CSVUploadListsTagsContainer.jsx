import React from 'react'
import ListsCreatableSelect from '../ListsAndTags/ListsCreatableSelect';
import TagsCreatableSelect from '../ListsAndTags/TagsCreatableSelect';

export default function CSVUploadListsTagsContainer({formHook}) {

    return (
        <>
            <div className='md:items-center'>
                <h2 className='text-lg md:items-center font-semibold leading-7'>
                Lists and Tags
                </h2>
                <p className='mt-1 text-base leading-6 text-gray-600'>
                Select Lists and Tags for Prospects
                </p>
            </div>
            <ListsCreatableSelect formHook={formHook}/>
            <TagsCreatableSelect formHook={formHook}/>
        </>
    )
}
