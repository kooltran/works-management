import React from 'react'
import classnames from 'classnames'

const TableListItem = ({ children, className }) => {
  return <div className={classnames('table-cell', className)}>{children}</div>
}

export default TableListItem
