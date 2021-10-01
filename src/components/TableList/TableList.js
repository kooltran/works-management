import React from 'react'
import TableListHeader from './TableListHeader'
import TableListBody from './TableListBody'

import './TableList.scss'

const TableList = ({ children }) => {
  return <div className="table-list">{children}</div>
}

export default TableList
