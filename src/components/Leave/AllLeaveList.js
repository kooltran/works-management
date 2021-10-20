import React, { useState } from 'react'
import moment from 'moment'
import Select from 'react-select'

import List from '../List'
import { useAppContext } from '../../AppContext'

const customStyles = {
  control: provided => ({
    ...provided,
    height: '100%',
    width: '100%',
    border: 0,
    minHeight: 0,
    outline: 'none',
    boxShadow: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderBottom: '2px solid #0FCEC3',
    borderRadius: 0,
    '&:hover': {
      borderColor: '#0FCEC3',
    },
  }),
  container: provided => ({
    ...provided,
    width: 200,
    height: '100%',
    marginBottom: 20,
  }),
  valueContainer: provided => ({
    ...provided,
    justifyContent: 'center',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: 'rgba(0, 0, 0, 0.87)',
  }),
  menu: provided => ({
    ...provided,
    margin: 0,
    borderRadius: 0,
  }),
  menuList: provided => ({
    ...provided,
    borderRadius: 0,
    padding: 0,
    boxShadow: '0px 2px 4px rgb(0 0 0 / 10%)',
    border: 0,
  }),
  option: (base, state) =>
    console.log(state) || {
      ...base,
      backgroundColor: state.isSelected ? '#0FCEC3' : '#fff',
    },
}

const AllLeaveList = () => {
  const {
    data: {
      leave: {
        all: { data: allLeaveList },
      },
    },
  } = useAppContext()

  const dates =
    allLeaveList?.map(item => item.dates.map(d => d.date).flat()) || []

  const monthsList = dates
    .flat()
    .map(d => ({
      label: moment(d, 'DD/MM/YYYY').format('MMMM'),
      value: moment(d, 'DD/MM/YYYY').month(),
    }))
    .filter(
      (item, index, self) =>
        self.findIndex(
          t => t.label === item.label && t.value === item.value
        ) === index
    )

  const [selectedMonth, setSelectedMonth] = useState(monthsList[0])

  const allLeaveByMonth = allLeaveList
    ?.map(leave => {
      const datesByMonth = leave.dates.filter(date => {
        const leaveMonthItem = moment(date.date, 'DD/MM/YYYY').month()
        return leaveMonthItem === selectedMonth?.value
      })
      return { ...leave, dates: datesByMonth }
    })
    .filter(item => item.dates.length > 0)

  const allLeaveGroupByUser = allLeaveByMonth?.reduce(
    (acc, leave) => ({
      ...acc,
      [leave.user.name]: [...(acc[leave.user.name] || []), leave],
    }),
    {}
  )

  const allLeaveListData =
    allLeaveGroupByUser &&
    Object.keys(allLeaveGroupByUser)?.map(key => {
      const leaveItem = allLeaveGroupByUser[key]

      const dates = leaveItem.map(item =>
        item.dates
          .map(d => (d.time.length === 2 ? d.date : `${d.date}(${d.time[0]})`))
          .flat()
          .sort()
      )

      const duration = dates
        .flat()
        .reduce(
          (acc, d) =>
            d.includes('am') || d.includes('pm') ? acc + 0.5 : acc + 1,
          0
        )

      return {
        Name: key,
        Dates: dates.flat().join(', '),
        'Duration (days)': duration,
      }
    })

  const handleChangeMonth = option => {
    setSelectedMonth(option)
  }

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="week-status"
        options={monthsList}
        value={selectedMonth}
        styles={customStyles}
        onChange={handleChangeMonth}
        isSearchable={false}
      />
      <List
        id="cui-sample-list-sortables"
        data={allLeaveListData}
        toggleInnerContent={false}
        options={{
          styles: {
            Name: {
              '--itemWidth': '20%',
            },
            'Duration (days)': {
              '--itemWidth': '15%',
              alignContent: 'center',
              textAlign: 'center',
            },
          },
        }}
      />
    </div>
  )
}

export default AllLeaveList
