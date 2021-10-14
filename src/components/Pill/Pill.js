import React from 'react'

import './styles.scss'

/**
 * Pill component
 */
const Pill = ({ children, pillBg, pillColor, id, style }) => {
  const pillStyle = {
    color: pillColor,
    backgroundColor: pillBg,
    ...style,
  }
  return (
    // eslint-disable-next-line react/jsx-no-duplicate-props
    <div className="cui-pill" id={id} style={pillStyle}>
      {children}
    </div>
  )
}

Pill.defaultProps = {
  pillBg: '#f3f6f7',
  pillColor: '#4f5a60',
  id: '',
}

export default Pill
