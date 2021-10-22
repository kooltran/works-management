import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import {
  getCurrentLeaveRequest,
  getCurrentLeaveSuccess,
  getCurrentLeaveFail,
} from '../../actions/leaveAction'
import { getCurrentUserLeaves } from '../../api/leaveAPI'

import PageLoading from '../../components/PageLoading/PageLoading'

import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'
import Pill from '../Pill'
import List from '../List'

const UserLeaveList = () => {
  const {
    data: {
      leave: {
        get: { data: currentLeaveData, loading: loadingLeaveData, fail },
      },
    },
    dispatch,
  } = useAppContext()

  const [showAlert, setShowAlert] = useState({})

  const leaveData =
    currentLeaveData?.map(item => {
      const dates = item.dates
        .map(d => (d.time.length === 2 ? d.date : `${d.date}(${d.time[0]})`))
        .flat()
        .sort()

      const duration = item.dates.reduce(
        (acc, d) => (d.time.length === 2 ? acc + 1 : acc + 0.5),
        0
      )
      return {
        Date: dates.join(', '),
        'Duration (day)': duration,
        Type: item.type.split('-').join(' '),
        Reason: item.reason,
        Status: item.status,
      }
    }) || []

  const getCurrentLeaves = async () => {
    dispatch(getCurrentLeaveRequest())
    try {
      const data = await getCurrentUserLeaves()
      dispatch(getCurrentLeaveSuccess(data))
    } catch (err) {
      dispatch(getCurrentLeaveFail(err.message))
    }
  }

  const pillColorMapping = {
    pending: {
      background: '#fdf0e4',
      color: '#F2994A',
    },
    approved: {
      background: 'rgb(47,128,237,0.2)',
      color: '#2F80ED',
    },
  }

  const ListResolver = d => {
    const result = { ...d }
    if (d.Status) {
      result.Status = (
        <Pill
          pillBg={pillColorMapping[d.Status].background}
          pillColor={pillColorMapping[d.Status].color}
          style={{ textTransform: 'capitalize' }}
        >
          {d.Status}
        </Pill>
      )
    }
    return result
  }

  const handleCloseAlert = () => setShowAlert({})

  useEffect(() => {
    getCurrentLeaves()
  }, [])

  useEffect(() => {
    setShowAlert({ type: 'error', message: fail })
  }, [fail])

  return (
    <div>
      {loadingLeaveData ? (
        <PageLoading />
      ) : (
        <List
          id="cui-sample-list-sortables"
          data={leaveData}
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
                textTransform: 'capitalize',
              },
              Type: {
                textTransform: 'capitalize',
              },
              'Duration (day)': {
                alignContent: 'center',
                textAlign: 'center',
              },
            },
          }}
          itemResolver={ListResolver}
          loading={loadingLeaveData}
        />
      )}

      {showAlert.message && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={handleCloseAlert}
        />
      )}
    </div>
  )
}

export default UserLeaveList
