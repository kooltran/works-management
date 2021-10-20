import React, { useEffect } from 'react'
import CustomTab from '../../components/Tab/CustomTab'

import { getAllLeave } from '../../api/leaveAPI'
import {
  getAllLeaveFail,
  getAllLeaveRequest,
  getAllLeaveSuccess,
} from '../../actions/leaveAction'
import { useAppContext } from '../../AppContext'

import LeaveApprovalList from './LeaveApprovalList'
import AllLeaveList from './AllLeaveList'

const LeaveAdmin = () => {
  const [activeTab, setTab] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }

  const { _, dispatch } = useAppContext()

  const getAllLeaveList = async () => {
    dispatch(getAllLeaveRequest())
    try {
      const allLeaveList = await getAllLeave()
      dispatch(getAllLeaveSuccess(allLeaveList))
    } catch (err) {
      dispatch(getAllLeaveFail(err.message))
    }
  }

  useEffect(() => {
    getAllLeaveList()
  }, [])

  const tabData = [
    {
      label: 'Approval Leave',
      content: <LeaveApprovalList />,
    },
    {
      label: 'Leave History',
      content: <AllLeaveList />,
    },
  ]

  return (
    <CustomTab
      tabData={tabData}
      activeTab={activeTab}
      handleChangeTab={handleChangeTab}
    />
  )
}

export default LeaveAdmin
