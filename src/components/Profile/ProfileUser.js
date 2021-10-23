import React, { useState, useEffect } from 'react'
import {
  GradeOutlined,
  FlagOutlined,
  FolderOpenOutlined,
  DateRangeOutlined,
  EmailOutlined,
} from '@material-ui/icons'

import { getCurrentProfile } from '../../api/profileAPI'
import {
  getCurrentProfileRequest,
  getCurrentProfileSuccess,
  getCurrentProfileFail,
} from '../../actions/profileAction'
import { useAppContext } from '../../AppContext'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import PageLoading from '../../components/PageLoading/PageLoading'
import NotificationDialog from '../NotificationDialog/NotificationDialog'
import person from '../../images/person.svg'

const ProfileUser = () => {
  const {
    data: {
      currentProfile: { data, loading, fail },
    },
    dispatch,
  } = useAppContext()
  const [showAlert, setShowAlert] = useState({})

  const getCurrentProfileItem = async () => {
    dispatch(getCurrentProfileRequest())
    try {
      const res = await getCurrentProfile()
      dispatch(getCurrentProfileSuccess(res))
    } catch (err) {
      dispatch(getCurrentProfileFail(err.response.data.message || err.message))
      setShowAlert({
        type: 'error',
        message: err.response.data.message || err?.message,
      })
    }
  }

  useEffect(() => {
    getCurrentProfileItem()
  }, [])

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <>
          {data && (
            <div className="profile-user">
              <div className="profile-user__image">
                <img src={person} alt="avatar" />
              </div>
              {data && (
                <>
                  <div className="profile-user__name">{data.name}</div>
                  <div className="profile-user__info">
                    <div className="profile-user__item">
                      <span className="icon">
                        <EmailOutlined />
                      </span>
                      <span>{data.email}</span>
                    </div>
                    <div className="profile-user__item">
                      <span className="icon">
                        <DateRangeOutlined />
                      </span>
                      <span className="text">{data.startDate}</span>
                    </div>
                    <div className="profile-user__item">
                      <span className="icon">
                        <FolderOpenOutlined />
                      </span>
                      <span className="text">
                        {data.project.map(proj => (
                          <li key={proj}>
                            <span>{proj}</span>
                          </li>
                        ))}
                      </span>
                    </div>
                    <div className="profile-user__item">
                      <span className="icon">
                        <GradeOutlined />
                      </span>
                      <span className="text">{data.position}</span>
                    </div>
                    <div className="profile-user__item">
                      <span className="icon">
                        <FlagOutlined />
                      </span>
                      <span className="text">{data.lead}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {showAlert.type && (
            <NotificationDialog
              {...showAlert}
              handleCloseDialog={() => {
                setShowAlert({})
              }}
            />
          )}

          {fail && <PageNotFound />}
        </>
      )}
    </>
  )
}

export default ProfileUser
