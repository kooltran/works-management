import React from 'react'
import classnames from 'classnames'

import Node from './Node'
import ListSortButton from './ListSortButton'

const ListHeader = ({
  id,
  data,
  resolver,
  toggleInner,
  options,
  sortHandler,
  sortables,
  sensitives,
}) => {
  const isSortable = key => {
    if (!key) return false
    if (sortables) {
      return Boolean(sortables[key])
    } else {
      return true
    }
  }
  const isSensitive = key => {
    if (!key) return false
    if (sensitives) {
      return Boolean(sensitives[key])
    } else {
      return false
    }
  }
  const renderItems = () => {
    const renderSortBtn = key => {
      if (!isSortable(key)) return null
      return (
        <ListSortButton
          onClickHandler={sortHandler(key)}
          id={`${key}-sortbtn`}
        />
      )
    }

    const headerItems = data.map((hd, idx) => {
      const _headerItem = classnames('cui-list__header_item', {
        'has-icon': isSortable(hd.key) || isSensitive(hd.key),
      })

      if (hd.key !== 'innerContent' && hd.key !== 'error') {
        const headerData = {
          ...hd,
          ...resolver(hd),
        }

        const styles = {
          ...((options.styles && options.styles[hd.key]) || {}),
          '--itemWidth':
            (options.styles &&
              options.styles[hd.key] &&
              options.styles[hd.key]['--itemWidth']) ||
            `${100 / data.length}%`,
        }
        if (options.items && options.items.length > 0) {
          if (options.items.some(i => i === hd.key)) {
            return (
              <div
                className={_headerItem}
                key={`cui-list__header-${hd.key}-${idx}`}
                style={styles}
              >
                <Node>
                  {headerData.node}
                  {headerData.node && renderSortBtn(hd.key)}
                </Node>
              </div>
            )
          }
          return null
        }
        return (
          <div
            className={_headerItem}
            key={`cui-list__header-${id}-${idx}`}
            style={styles}
          >
            <Node>
              {headerData.node}
              {renderSortBtn(hd.key)}
            </Node>{' '}
          </div>
        )
      }
      return null
    })
    if (toggleInner) {
      headerItems.push(
        <div
          className="cui-list__header_item toggle"
          key={`cui-list__header-${id}-toggle`}
        >
          <Node />{' '}
        </div>
      )
    }
    return headerItems
  }
  return <div className="cui-list__header">{renderItems()}</div>
}

export default ListHeader
