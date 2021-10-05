import React from 'react'
import classnames from 'classnames'

const TableListHeader = ({ children, className }) => {
  return (
    <div className={classnames('table-list__header', className)}>
      {children}
    </div>
  )
}

export default TableListHeader
