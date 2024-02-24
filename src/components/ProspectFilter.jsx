import React from 'react'
import ListsTagsContainer from './ListsAndTags/ListsTagsContainer'
import ListCountInput from './ListsAndTags/ListCountInput'
import TagCountInput from './ListsAndTags/TagCountInput'
import ListAndTagSearchType from './ListsAndTags/ListAndTagSearchType'

function ProspectFilter(
    {
      filterProps,
      onListCountInputChange,
      onTagCountInputChange,
      onChangeLists,
      onListSearchTypeInputChange,
      onTagSearchTypeInputChange,
      onChangeTags
    }) {
  return (
    <>
        <ListsTagsContainer 
          currentLists={filterProps.lists}
          currentTags={filterProps.tags}
          handleChangeLists={onChangeLists}
          handleChangeTags={onChangeTags}
        />
        <ListAndTagSearchType 
          onListSearchTypeInputChange={onListSearchTypeInputChange}
          onTagSearchTypeInputChange={onTagSearchTypeInputChange}
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