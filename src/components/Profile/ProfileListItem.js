import React from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'

import TableListItem from '../Table/TableListItem'

const ProfileItem = ({ item, handleEditProfile }) => {
  return (
    item && (
      <div className="profile-list__item table-list__body--row">
        <TableListItem className="profile-name">{item.name}</TableListItem>
        <TableListItem>{item.email}</TableListItem>
        <TableListItem>{item.position}</TableListItem>
        <TableListItem className="profile-project">
          <ul>
            {item.project.map((proj, index) => (
              <li key={`${proj}-${index}`}>
                <span>{proj}</span>
              </li>
            ))}
          </ul>
        </TableListItem>
        <TableListItem className="profile-lead">{item.lead}</TableListItem>
        <TableListItem className="profile-action">
          <span onClick={() => handleEditProfile(item._id)}>
            {item.isEditing ? <CheckOutlinedIcon /> : <EditOutlinedIcon />}
          </span>
          <span>
            <DeleteOutlineOutlinedIcon />
          </span>
        </TableListItem>
      </div>
    )
  )
}

export default ProfileItem
