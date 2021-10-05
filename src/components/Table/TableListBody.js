import React from 'react'
import classnames from 'classnames'

const TableListBody = ({ children, className }) => {
  return (
    <div className={classnames('table-list__body', className)}>{children}</div>
  )
}

export default TableListBody
