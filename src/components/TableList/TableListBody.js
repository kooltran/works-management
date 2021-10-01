import React from 'react'
import TableListBodyItem from './TableListBodyItem'

const TableListBody = ({ data, handleEditTaskItem }) => {
  return (
    <div className="table-list__body">
      {data.map(item => {
        return (
          <TableListBodyItem
            key={item.id}
            bodyItem={item}
            handleEditTaskItem={handleEditTaskItem}
          />
        )
      })}
    </div>
  )
}

export default TableListBody
