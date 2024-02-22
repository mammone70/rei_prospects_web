import React from 'react'
import ListsTagsContainer from './ListsAndTags/ListsTagsContainer'
import ListCountInput from './ListsAndTags/ListCountInput'
import TagCountInput from './ListsAndTags/TagCountInput'

function ProspectFilter(
    {
      filterProps,
      onListCountInputChange,
      onTagCountInputChange,
      onChangeLists,
      onChangeTags
    }) {
  return (
    <>
        <ListsTagsContainer 
          currentLists={filterProps.list}
          currentTags={filterProps.tags}
          handleChangeLists={onChangeLists}
          handleChangeTags={onChangeTags}
        />
        <ListCountInput 
          minListCount={filterProps.minListCount}
          maxListCount={filterProps.maxListCount}
          onChange={onListCountInputChange}
        />
        <TagCountInput 
          minTagCount={filterProps.minTagCount}
          maxTagCount={filterProps.maxTagCount}
          onChange={onTagCountInputChange}
        />
    </>
  )
}

export default ProspectFilter