import React, { useEffect, useState } from 'react'
import ProfileListItem from './ProfileListItem'

import { getRole } from '../../helpers'

import './Profile.scss'
import ProfileItem from './ProfileListItem'

const ProfileList = ({ profileList, currentProfile }) => {
  const role = getRole()

  return (
    <div>
      {role === 'admin' ? (
        <div className="profile-list__all">
          {profileList?.map(item => (
            <ProfileListItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <ProfileItem item={currentProfile} />
      )}
    </div>
  )
}

export default ProfileList
