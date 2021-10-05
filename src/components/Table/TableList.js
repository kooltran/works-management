import React from 'react'
import classnames from 'classnames'

import './Table.scss'

const TableList = ({ children, col, className }) => {
  return (
    <div
      className={classnames(`table-list`, className, {
        [`table-col${col}`]: col,
      })}
    >
      {children}
    </div>
  )
}

export default TableList
