import React, { useState, useEffect, useRef } from 'react'
import { Formik } from 'formik'
import { object, string, array } from 'yup'
import Select from 'react-select'
import { Button } from '@material-ui/core'

import {
  getCurrentLeaveSuccess,
  createLeaveRequest,
  createLeaveSuccess,
  createLeaveFail,
} from '../../actions/leaveAction'
import { createLeave, getCurrentUserLeaves } from '../../api/leaveAPI'
import { useAppContext } from '../../AppContext'

import LeaveDatePicker from './LeaveDatePicker'

const Schema = object().shape({
  dates: array().min(1, 'Please Choose leave date').required(),
  type: string().required().label('Leave Type'),
  reason: string().required().label('Leave Reason'),
})

const leaveTypeOptions = [
  { label: 'Annual Leave', value: 'annual-leave' },
  { label: 'Unpaid Leave', value: 'unpaid-leave' },
  { label: 'Sick Leave', value: 'sick-leave' },
]

const LeaveForm = ({ isShowLeaveForm }) => {
  const formRef = useRef()

  const [selectedLeaveType, setType] = useState(leaveTypeOptions[0])
  const {
    data: {
      leave: {
        dates,
        get: { data: leaveData, creating: creatingLeave, fail },
      },
    },
    dispatch,
  } = useAppContext()

  const leaveDatesArr = leaveData?.map(data => {
    return data.dates
  })

  const leaveDates = leaveDatesArr?.flat()

  const handleChangeLeaveType = name => option => {
    const { setFieldValue } = formRef.current
    setFieldValue(name, option.value)
    setType(option)
  }

  const handleChangeReason = ({ target: { name, value } }) => {
    const { setFieldValue } = formRef.current
    setFieldValue(name, value)
  }

  const submitLeaveForm = async payload => {
    dispatch(createLeaveRequest())
    try {
      const data = await createLeave(payload)
      dispatch(createLeaveSuccess(data))
    } catch (err) {
      dispatch(
        createLeaveFail(err?.response?.data?.error.message || err.message)
      )
    }
  }

  const handleSubmitLeave = values => {
    submitLeaveForm(values)
  }

  useEffect(() => {
    const setFieldValue = formRef?.current?.setFieldValue
    if (setFieldValue) {
      setFieldValue('dates', dates)
    }
  }, [dates])

  return (
    <Formik
      onSubmit={handleSubmitLeave}
      initialValues={{
        type: selectedLeaveType.value,
        dates: [],
        reason: '',
      }}
      validationSchema={Schema}
      innerRef={formRef}
      className="leave-form"
    >
      {({
        handleSubmit,
        handleChange,
        touched,
        errors,
        handleBlur,
        values,
      }) => {
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="leave-form__item leave-form__type">
                <div className="title">Leave Type</div>
                <Select
                  options={leaveTypeOptions}
                  value={selectedLeaveType}
                  name="type"
                  onChange={handleChangeLeaveType('type')}
                />
              </div>
              <div className="leave-form__item leave-form__block">
                <div className="leave-form__datepicker">
                  <div className="title">Leave Dates</div>
                  <LeaveDatePicker selectedDates={leaveDates} />
                </div>
                <div className="leave-form__desc">
                  <div className="total-date">
                    <div className="title">Total</div>
                    <div>
                      {dates?.map(item => {
                        let time = ''

                        if (item.time.length === 2) {
                          time = ''
                        } else {
                          time = `, ${item.time[0].toUpperCase()}`
                        }

                        return (
                          <div key={item.date} className="">
                            <span>{item.date}</span>
                            <span>{time}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="leave-reason">
                    <div className="title">Reason</div>
                    <div>
                      <textarea
                        autoFocus
                        rows={1}
                        onChange={handleChangeReason}
                        name="reason"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                color="primary"
                type="submit"
                variant="outlined"
                disabled={!!Object.keys(errors).length || creatingLeave}
              >
                Submit
              </Button>
            </form>
          </div>
        )
      }}
    </Formik>
  )
}

export default LeaveForm
