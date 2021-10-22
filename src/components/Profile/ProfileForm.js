import React, { useState, useRef, useEffect } from 'react'
import { Formik } from 'formik'
import { object, string, array } from 'yup'
import { format } from 'date-fns'
import {
  CloseOutlined,
  GradeOutlined,
  FlagOutlined,
  PersonOutlined,
  FolderOpenOutlined,
  EmailOutlined,
} from '@material-ui/icons'
import { TextField, makeStyles } from '@material-ui/core'
import CreatableSelect from 'react-select/creatable'
import classNames from 'classnames'
import { components } from 'react-select'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import CustomButton from '../../components/CustomButton/CustomButton'
import {
  renderProfileValues,
  FORMAT,
  formatDate,
  parseDate,
} from '../../helpers'
import 'react-day-picker/lib/style.css'

const projectListCustomStyle = {
  control: provided => ({
    ...provided,
    border: 0,
    outline: 'none',
    boxShadow: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginLeft: 5,
  }),
  container: provided => ({
    ...provided,
    width: '100%',
    height: '100%',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: 0,
    color: '#0FCEC3',
  }),
  menu: provided => ({
    ...provided,
    margin: 0,
    borderRadius: 0,
  }),
  menuList: provided => ({
    ...provided,
    borderRadius: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#0FCEC3' : '#fff',
    display: 'flex',
    justifyContent: 'space-between',
  }),
}

const useStyles = makeStyles(() => ({
  btnSubmit: {
    width: '25%',
    cursor: 'pointer',
    '&::before': {
      content: '',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#ff7870',
    },
  },
  marginComponentChid: {
    margin: '1.5rem auto 0',
  },
  buttonSave: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  textDanger: {
    color: 'red',
    fontSize: '12px',
  },
  customTitle: {
    color: '#294272',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: 1,
    fontSize: '0.8rem',
    paddingBottom: '9px',
    marginTop: '1rem',
  },
}))

const useHelperTextStyles = makeStyles(() => ({
  root: {
    '&.MuiFormControl-root': {
      marginTop: '1rem',
    },
    '& .MuiFormLabel-root': {
      color: '#294272',
      fontWeight: 500,
    },
    '& .MuiInputBase-root': {
      borderRadius: '2px',
      font: '-webkit-small-control',
      padding: '9px 10px 2px',
      paddingLeft: 0,
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #0FCEC3',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '1px solid rgb(6 111 105)',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #2fff00 !important',
    },
    '& .MuiListSubheader-root': {
      color: '#00cacb',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      fontSize: '14px',
      fontWeight: 700,
    },
    '& .MuiInputBase-input': {
      paddingLeft: '15px',
    },
    '& .css-1n7v3ny-option ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .css-yt9ioa-option ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .css-9gakcf-option ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .css-1okebmr-indicatorSeparator': {
      display: 'none',
    },
    '&  .css-1s2u09g-control': {
      borderStyle: 'none',
      borderRadius: '0px',
      borderBottom: '1px solid salmon',
      menuIsOpen: 'true',
    },
    '& .css-b62m3t-container:before': {
      left: 0,
      right: 0,
      bottom: 0,
      content: '0a0',
      position: 'absolute',
      transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      pointerEvents: 'none',
    },
    '& .css-1pahdxg-control:hover': {
      borderColor: 'none',
    },
  },
}))

const Schema = object().shape({
  name: string()
    .min(6, 'Username is too short!')
    .max(50, 'Username is too long!')
    .required('Username is required field'),
  position: string()
    .min(2, 'Position field is too Short!')
    .max(50, 'Position field is too long!')
    .required('Position is required field'),
  lead: string()
    .min(2, 'Lead name field is too Short!')
    .max(50, 'Lead name field is too long!')
    .required('Lead is required field'),
  project: array().min(1, "Projects can't be empty").required(),
  startDate: string()
    .when('isShowStartDate', {
      is: true,
      then: string().required(),
    })
    .label('Start date'),
  email: string()
    .when('isShowEmail', {
      is: true,
      then: string()
        .matches(
          /^[A-Za-z._%+-]+@s3corp.com.vn$/,
          'Please enter valid email with S3Corp domain'
        )
        .email('Please enter valid email with S3Corp domain')
        .required(),
    })
    .label('Email'),
})

const ProfileForm = ({
  initCreatableOptions,
  profileValues,
  isDisabled,
  updateProfileList,
  createNewProfile,
  title,
}) => {
  const formRef = useRef()
  const textStyles = useHelperTextStyles()
  const classes = useStyles()

  const { Option } = components
  const IconOption = props => (
    <div className={textStyles.root}>
      <Option {...props}>
        <span>{props.label}</span>
        <CloseOutlined onClick={() => handleDeleteOption(props.data)} />
      </Option>
    </div>
  )

  const [projectOption, setProjectoption] = useState(initCreatableOptions)
  const [selectedProjectItem, setProjectItem] = useState(
    initCreatableOptions[0]
  )
  const [isDeleteProjItem, setDeleteProjItem] = useState(false)

  const handleCreateProjItem = inputOption => {
    const newProfileOption = {
      label: inputOption,
      value: inputOption,
    }
    const { setFieldValue, setFieldTouched } = formRef.current
    const createdProjectOption = [...projectOption, newProfileOption]
    const createdProjectValues = renderProfileValues(createdProjectOption)

    setProjectoption(createdProjectOption)
    setProjectItem(newProfileOption)
    setDeleteProjItem(false)
    setFieldTouched('project', true)
    setFieldValue('project', createdProjectValues)
  }

  const handleDeleteOption = data => {
    const deletedProjectOption = projectOption.filter(x => x !== data)
    const { setFieldValue, setFieldTouched } = formRef.current
    const deletedProjectValues = renderProfileValues(deletedProjectOption)

    setProjectoption(deletedProjectOption)
    setDeleteProjItem(true)
    setFieldTouched('project', true)
    setFieldValue('project', deletedProjectValues)
  }

  const handleSubmitProfileForm = values => {
    if (updateProfileList) {
      updateProfileList(values)
    }

    if (createNewProfile) {
      createNewProfile(values)
    }
  }
  const handleDayChange = day => {
    const { setFieldValue } = formRef.current
    setFieldValue('startDate', format(day, 'dd/MM/yyyy'))
  }

  useEffect(() => {
    if (isDeleteProjItem) {
      if (projectOption.length === 0) {
        setProjectItem({})
      } else {
        setProjectItem(projectOption[0])
      }
    }
  }, [projectOption, isDeleteProjItem])

  return (
    <Formik
      onSubmit={handleSubmitProfileForm}
      initialValues={{ ...profileValues }}
      validationSchema={Schema}
      innerRef={formRef}
    >
      {({
        handleSubmit,
        handleChange,
        touched,
        errors,
        handleBlur,
        values,
      }) => {
        const isInitSubmitDisabled = Object.values(values)
          .filter(value => typeof value !== 'boolean')
          .every(item => item === '' || item.length === 0)

        return (
          <form onSubmit={handleSubmit} className="profile-form">
            <div>
              <div className="profile-form__title">{title}</div>
              <TextField
                className={textStyles.root}
                fullWidth
                id="profile-name"
                name="name"
                label="Profile Name"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={profileValues?.name}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <PersonOutlined style={{ fill: '#0FCEC3' }} />
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {touched.name && errors.name && (
                <div className={classes.textDanger}>{errors.name}</div>
              )}
              {profileValues.email !== undefined && (
                <TextField
                  className={textStyles.root}
                  fullWidth
                  id="profile-email"
                  name="email"
                  label="Profile Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={profileValues?.email}
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <EmailOutlined style={{ fill: '#0FCEC3' }} />
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
              {touched.email && errors.email && (
                <div className={classes.textDanger}>{errors.email}</div>
              )}
              {profileValues.startDate !== undefined && (
                <>
                  <div className={classes.customTitle}>Start Date</div>
                  <DayPickerInput
                    value={profileValues.startDate}
                    onDayChange={handleDayChange}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    name="startDate"
                    placeholder="DD/MM/YYYY"
                    dayPickerProps={{
                      showOutsideDays: true,
                      enableOutsideDaysClick: true,
                      firstDayOfWeek: 1,
                      disabledDays: {
                        daysOfWeek: [0, 6],
                      },
                    }}
                  />
                  {touched.startDate && errors.startDate && (
                    <div className={classes.textDanger}>{errors.startDate}</div>
                  )}
                </>
              )}
              <TextField
                className={textStyles.root}
                fullWidth
                id="position"
                name="position"
                label="Position"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={profileValues?.position}
                margin="dense"
                InputProps={{
                  startAdornment: <GradeOutlined style={{ fill: '#0FCEC3' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {touched.position && errors.position && (
                <div className={classes.textDanger}>{errors.position}</div>
              )}
              <div className={classes.customTitle}>Project</div>
              <div className="project-dropdown">
                <FolderOpenOutlined style={{ fill: '#0FCEC3' }} />
                <CreatableSelect
                  components={{ Option: IconOption }}
                  onCreateOption={handleCreateProjItem}
                  options={projectOption}
                  value={selectedProjectItem}
                  styles={projectListCustomStyle}
                  placeholder="Type and enter to create new item"
                  name="project"
                />
              </div>
              {touched.project && errors.project && (
                <div className={classes.textDanger}>{errors.project}</div>
              )}
              <TextField
                className={textStyles.root}
                fullWidth
                id="lead"
                name="lead"
                label="Leader"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={profileValues?.lead}
                margin="dense"
                InputProps={{
                  startAdornment: <FlagOutlined style={{ fill: '#0FCEC3' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {touched.lead && errors.lead && (
                <div className={classes.textDanger}>{errors.lead}</div>
              )}
              <div className={classes.buttonSave}>
                <CustomButton
                  variant="outlined"
                  textcolor="#fff"
                  background="#00D1B2"
                  style={{ textTransform: 'capitalize', fontSize: 16 }}
                  hover={{
                    color: '#fff',
                    backgroundColor: '#00D1B2',
                    opacity: 0.8,
                  }}
                  border="#00D1B2"
                  className={classNames(
                    classes.btnSubmit,
                    classes.marginComponentChid
                  )}
                  type="submit"
                  disabled={
                    isInitSubmitDisabled ||
                    !!Object.keys(errors).length ||
                    isDisabled
                  }
                >
                  Save
                </CustomButton>
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default ProfileForm
