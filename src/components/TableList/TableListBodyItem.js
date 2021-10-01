import React from 'react'
import TableListItem from './TableListItem'

const TableListBodyItem = ({ bodyItem, handleEditTaskItem }) => {
  // console.log(bodyItem, 'bodyItem')
  const rendererBodyItem = Object.values(bodyItem).filter(
    item => item.type !== 'key'
  )

  return (
    <div className="table-list__body--row">
      {rendererBodyItem.map((item, index) => {
        return (
          <TableListItem
            key={index}
            item={item}
            id={bodyItem.id.value}
            isEditing={bodyItem.isEditing.value}
            isShowEdit={bodyItem.isShowEdit.value}
            handleEditTaskItem={handleEditTaskItem}
          />
        )
      })}
    </div>
  )
}
export default TableListBodyItem
