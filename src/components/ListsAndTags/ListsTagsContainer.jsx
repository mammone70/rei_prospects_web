import React from 'react'
import ListsCreatableSelect from './ListsCreatableSelect';
import TagsCreatableSelect from './TagsCreatableSelect';

export default function ListsTagsContainer(
    {
        formHook,
        currentLists,
        currentTags,
        handleChangeLists,
        handleChangeTags
    }) 
    {
        return (
            <>
                <div className='md:items-center'>
                    <h2 className='text-lg md:items-center font-semibold leading-7'>
                    Lists and Tags
                    </h2>
                    <p className='mt-1 text-base leading-6 text-gray-600'>
                    Select Lists and Tags
                    </p>
                </div>
                <ListsCreatableSelect 
                    formHook={formHook} 
                    currentLists={currentLists}
                    handleChangeLists={handleChangeLists}    
                />
                <TagsCreatableSelect 
                    formHook={formHook} 
                    currentTags={currentTags}
                    handleChangeTags={handleChangeTags }
                />
            </>
        )
}
