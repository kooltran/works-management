import React, { useState } from 'react'
import classnames from 'classnames'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'

import Node from './Node'

const ListItem = ({ content, toggleInner, options, primaryKey }) => {
  const [activeInner, setActiveInner] = useState(false)
  const _ListItem = classnames('cui-list__item', {
    'active-inner': activeInner,
  })
  const _ToggleBtn = classnames('cui-toggle', {
    active: activeInner,
  })

  const handleToggle = () => {
    setActiveInner(!activeInner)
  }

  const renderNodes = () => {
    const dataKeys = Object.keys(content)
    if (dataKeys.length > 0) {
      const items = dataKeys.map((d, idx) => {
        const styles = {
          ...((options.styles && options.styles[d]) || {}),
          '--itemWidth':
            (options.styles &&
              options.styles[d] &&
              options.styles[d]['--itemWidth']) ||
            `${100 / dataKeys.length}%`,
        }
        const _ItemNode = classnames({
          'is-primary-key': primaryKey === d,
        })
        if (d !== 'innerContent' && d !== 'error') {
          if (options.items && options.items.length > 0) {
            if (options.items.some(i => i === d)) {
              return (
                <Node
                  key={`cui-node--${idx}`}
                  id={`node-${d}`}
                  data-key={`${d}`}
                  styles={styles}
                >
                  {content[d]}
                </Node>
              )
            }
            return null
          }
          return (
            <Node
              key={`cui-node--${idx}`}
              id={`node-${d}`}
              data-key={`${d}`}
              styles={styles}
              className={_ItemNode}
            >
              {content[d]}
            </Node>
          )
        }
        return null
      })
      if (toggleInner && content.innerContent) {
        items.push(
          <Node
            className="toggle"
            key={`cui-node--${content.id}-toggle`}
            id={`node-${content.id}`}
            data-key={`${content.id}`}
          >
            <button className={_ToggleBtn} onClick={handleToggle}>
              <UnfoldMoreIcon onClick={handleToggle} />
            </button>
          </Node>
        )
      }
      return items
    }
    return null
  }

  const renderInnerContent = () => {
    if (content.innerContent && activeInner) {
      return (
        <>
          <hr className="cui-list__inner-content-divider" />
          <div className="cui-list__item_innercontent">
            {content.innerContent}
          </div>
        </>
      )
    }
    return null
  }

  const renderError = () => {
    if (!content.error) {
      return null
    }
    return (
      <>
        <hr className="cui-list__inner-content-divider" />
        <div className="cui-list__item_innercontent cui-list__item-error">
          {content.error}
        </div>
      </>
    )
  }
  return (
    <div className={_ListItem}>
      <div className="cui-list__item_container">{renderNodes()}</div>
      {(!toggleInner || (toggleInner && activeInner)) && renderInnerContent()}
      {renderError()}
    </div>
  )
}

ListItem.defaultProps = {
  content: {},
  toggleInner: true,
  options: {},
}

export default ListItem
