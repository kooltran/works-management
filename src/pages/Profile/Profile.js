import React from 'react'
import ProfileList from '../../components/Profile/ProfileList'
import CustomTab from '../../components/Tab/CustomTab'

const tabMapping = {
  0: 'task-form',
  1: 'task-history',
}

const Profile = () => {
  const [activeTab, setTab] = React.useState(0)

  const tabData = [
    {
      label: 'New Profile',
      content: <div>new profle</div>,
    },
    {
      label: 'Profile List',
      content: <ProfileList />,
    },
  ]

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <div className="profile-wrapper">
      <CustomTab
        tabData={tabData}
        activeTab={activeTab}
        handleChangeTab={handleChangeTab}
      />
    </div>
  )
}

export default Profile
