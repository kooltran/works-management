import React from 'react'

import { getRole } from '../../helpers'

import UserLeaveList from '../../components/Leave/UserLeaveList'
import LeaveAdmin from '../../components/Leave/LeaveAdmin'

import './Leave.scss'

const LeaveManagement = () => {
  const role = getRole()

  return (
    <div className="leave-wrapper">
      {role === 'admin' ? <LeaveAdmin /> : <UserLeaveList />}
    </div>
  )
}

export default LeaveManagement
