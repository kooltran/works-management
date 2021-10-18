import React from 'react'
import CustomTab from '../../components/Tab/CustomTab'

const LeaveApprovalList = () => {
  return <div>Approval Leave List</div>
}

const AllLeaveList = () => {
  return <div>All Leave List</div>
}

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

const LeaveAdmin = () => {
  const [activeTab, setTab] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <CustomTab
      tabData={tabData}
      activeTab={activeTab}
      handleChangeTab={handleChangeTab}
    />
  )
}

export default LeaveAdmin
