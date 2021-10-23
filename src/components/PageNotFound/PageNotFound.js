import React from 'react'
import NotFound from '../../images/not_found.png'

import './PageNotFound.scss'

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img src={NotFound} alt="page-not-found" />
    </div>
  )
}

export default PageNotFound
