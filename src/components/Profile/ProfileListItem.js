import React from 'react'

const ProfileItem = ({ item }) => {
  return (
    item && (
      <div className="profile-list__item">
        <div className="name">{item.name}</div>
        <div className="email">{item.email}</div>
        <div className="position">{item.position}</div>
        <div className="project">
          <ul>
            {item.project.map((proj, index) => (
              <li key={`${proj}-${index}`}>
                <span>{proj}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lead">{item.lead}</div>
      </div>
    )
  )
}

export default ProfileItem
