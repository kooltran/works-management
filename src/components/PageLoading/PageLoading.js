import React from 'react'
import PageLoadingIcon from '../../images/page_loading.svg'

import './PageLoading.scss'

const PageLoading = () => {
  return (
    <div className="page-loading">
      <img src={PageLoadingIcon} alt="page_loading" />
    </div>
  )
}

export default PageLoading
