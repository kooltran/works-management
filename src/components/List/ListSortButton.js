import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'

const ListSortButton = ({ id, onClickHandler }) => {
  const _ListSortButton = classnames('cui-list__sort--btn')
  return (
    <span className={_ListSortButton} id={id} onClick={onClickHandler}>
      <UnfoldMoreIcon />
    </span>
  )
}

ListSortButton.propTypes = {
  id: PropTypes.string,
}

export default ListSortButton
