import React, { useEffect } from 'react'
import ProfileListItem from './ProfileListItem'

import './Profile.scss'

const ProfileList = ({ profileList }) => {
  return (
    <div className="profile-list">
      {profileList?.map(item => (
        <ProfileListItem key={item._id} item={item} />
      ))}
    </div>
  )
}

export default ProfileList
