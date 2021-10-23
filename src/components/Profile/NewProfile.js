import React, { useState } from 'react'
import {
  createProfileRequest,
  createProfileSuccess,
  createProfileFail,
} from '../../actions/profileAction'
import { createProfile } from '../../api/profileAPI'
import { useAppContext } from '../../AppContext'
import ProfileForm from './ProfileForm'

const NewProfile = () => {
  const {
    data: {
      profile: {
        get: { createFail, creating },
      },
    },
    dispatch,
  } = useAppContext()
  const [errorCreated, setError] = useState('')

  const handleCreateNewProfile = async values => {
    const submitPayload = Object.entries(values).filter(
      ([key, value]) => typeof value !== 'boolean'
    )
    const payload = Object.fromEntries(submitPayload)

    dispatch(createProfileRequest())
    try {
      const createdProfileItem = await createProfile(payload)
      dispatch(createProfileSuccess(createdProfileItem))
    } catch (err) {
      setError(err?.response?.data?.error_message || err?.message)
      dispatch(
        createProfileFail(err?.response?.data?.error_message || err?.message)
      )
    }
  }

  return (
    <div className="profile-new">
      <ProfileForm
        initCreatableOptions={[]}
        isDisabled={creating}
        profileValues={{
          name: '',
          position: '',
          lead: '',
          project: [],
          startDate: '',
          email: '',
          isShowStartDate: true,
          isShowEmail: true,
        }}
        title="Create New Profile"
        createNewProfile={handleCreateNewProfile}
      />

      {createFail && (
        <div style={{ fontSize: 18, color: 'red', textAlign: 'center' }}>
          {errorCreated}
        </div>
      )}
    </div>
  )
}

export default NewProfile
