import React from 'react'

const TableListHeader = ({ data }) => {
  return (
    <div className="table-list__header">
      {data.map(item => (
        <div key={item} className="table-list__header--item">
          {item}
        </div>
      ))}
    </div>
  )
}

export default TableListHeader
