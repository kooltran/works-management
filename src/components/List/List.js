import React from 'react'
import classnames from 'classnames'

import { sortBy } from '../../helpers'

import ScreenSize from '../ScreenSize'

import ListHeader from './ListHeader'
import ListItem from './ListItem'

import './styles.scss'

const extractHeaderData = data => {
  let headerData = []
  if (data.length > 0) {
    const keys = Object.keys(data[0])
    headerData = keys.map(key => ({
      key,
      node: key,
    }))
    return headerData
  }
  return headerData
}

const List = ({
  id,
  data: dataProp,
  itemResolver,
  headerResolver,
  mobileItemResolver,
  emptyComponent,
  toggleInnerContent,
  className,
  options,
  styles,
  groupsMobileResolver,
  mobileLayout,
  primaryKey,
  onSort,
}) => {
  const { useScreenSize } = ScreenSize

  const screenSize = useScreenSize()
  const mobileBreakpoint = 768
  const isMobile = screenSize.width < mobileBreakpoint
  const [data, setData] = React.useState(dataProp)

  const [sortAsc, setSortAsc] = React.useState(true)

  React.useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  const sortHandler = key => () => {
    const toggleAsc = !sortAsc
    const order = toggleAsc ? 'asc' : 'desc'
    if (onSort) {
      onSort(key, order)
    } else {
      const sorted = sortBy(data, key, order)
      setSortAsc(toggleAsc)
      setData(sorted)
    }
  }

  const renderHeader = () => {
    if (data.length > 0) {
      const headerData = extractHeaderData(data, options.items)
      return (
        <ListHeader
          id={id}
          data={headerData}
          resolver={headerResolver}
          toggleInner={toggleInnerContent}
          options={options}
          primaryKey={primaryKey}
          sortHandler={sortHandler}
        />
      )
    }
    return null
  }

  const renderItems = (forMobile = false, groupData = data) => {
    if (data.length > 0) {
      return (
        <div className="cui-list__items">
          {data.map((d, idx) => {
            let itemData = d

            if (!forMobile && itemResolver) {
              itemData = {
                ...itemResolver(d, idx),
              }
            }
            if (forMobile && mobileItemResolver) {
              itemData = {
                ...mobileItemResolver(d, idx),
              }
            }

            return (
              <ListItem
                key={`cui-list__item-${id}_${idx}`}
                content={itemData}
                toggleInner={toggleInnerContent}
                options={options}
                primaryKey={primaryKey}
              />
            )
          })}
        </div>
      )
    }
    if (emptyComponent) {
      return emptyComponent
    }
    return 'You have an empty list.'
  }

  const renderMobileList = groupData => {
    return renderItems(true, groupData)
  }

  const renderList = () => {
    if (isMobile && mobileItemResolver) {
      if (groupsMobileResolver) {
        const groups = groupsMobileResolver(data)
        if (groups.length === 0) {
          return renderMobileList()
        }
        return (
          <>
            {groups.map(group => {
              return (
                <React.Fragment key={group.title}>
                  <div className="cui-list__group-title">
                    <span>{group.title}</span>
                  </div>
                  {renderMobileList(group.data)}
                </React.Fragment>
              )
            })}
          </>
        )
      } else {
        return renderMobileList()
      }
    }

    return (
      <>
        {renderHeader()}
        {renderItems()}
      </>
    )
  }

  const _List = classnames(`cui-list`, className, {
    'use-mobile-layout': mobileLayout,
  })
  return (
    <>
      <div className={_List} styles={styles}>
        <div className="cui-list__container">{renderList()}</div>
      </div>
    </>
  )
}

List.defaultProps = {
  data: [],
  filterData: [],
  sortData: [],
  itemResolver: d => {
    return d
  },
  headerResolver: h => {
    return h
  },
  mobileItemResolver: null,
  className: '""',
  emptyComponent: null,
  toggleInnerContent: false,
  options: {
    items: [],
    styles: {},
  },
  sortConfig: null,
  mobileLayout: false,
}

const ListWithScreenProvider = Comp => {
  return class extends React.PureComponent {
    render() {
      const { ...compProps } = this.props
      const { ScreenSizeProvider } = ScreenSize
      return (
        <ScreenSizeProvider>
          <Comp {...compProps} />
        </ScreenSizeProvider>
      )
    }
  }
}

export default ListWithScreenProvider(List)
