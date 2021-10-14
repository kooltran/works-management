import React, { useEffect } from 'react'
import { useAppContext } from '../../AppContext'
import {
  getCurrentLeaveRequest,
  getCurrentLeaveSuccess,
  getCurrentLeaveFail,
} from '../../actions/leaveAction'
import { getCurrentUserLeaves } from '../../api/leaveAPI'

import Pill from '../Pill'
import List from '../List'

const sampleData = [
  {
    Date: '10 May 2021',
    'Duration (day)': '2',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '11 May 2021',
    'Duration (day)': '1',
    Type: 'Unpaid Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '12 May 2021',
    'Duration (day)': '3',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '13 May 2021',
    'Duration (day)': '4',
    Type: 'Unpaid Leave',
    Reason: 'Personal Issues',
    Status: 'Rejected',
  },
  {
    Date: '14 May 2021',
    'Duration (day)': '2',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '15 May 2021',
    'Duration (day)': '5',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Approved',
  },
]

const UserLeaveList = () => {
  const {
    data: {
      leave: {
        get: { data },
        create: { data: createdLeaveData },
      },
    },
    dispatch,
  } = useAppContext()

  const getCurrentLeaves = async () => {
    dispatch(getCurrentLeaveRequest())
    try {
      const data = await getCurrentUserLeaves()
      dispatch(getCurrentLeaveSuccess(data))
    } catch (err) {
      dispatch(getCurrentLeaveFail(err.message))
    }
  }

  const ListResolver = d => {
    const result = { ...d }
    if (d.Status) {
      result.Status = (
        <Pill pillBg="#fdf0e4" pillColor="#F2994A">
          {d.Status}
        </Pill>
      )
    }
    return result
  }

  useEffect(() => {
    getCurrentLeaves()
  }, [])

  return (
    <div>
      <List
        id="cui-sample-list-sortables"
        data={sampleData}
        toggleInnerContent={false}
        options={{
          styles: {
            Status: {
              '--itemWidth': '15%',
              textAlign: 'right',
              alignContent: 'flex-end',
            },
            Reason: {
              '--itemWidth': '15%',
            },
            'Duration (day)': {
              // '--itemWidth': '15%',
              alignContent: 'center',
              textAlign: 'center',
            },
          },
        }}
        itemResolver={ListResolver}
      />
    </div>
  )
}

export default UserLeaveList
