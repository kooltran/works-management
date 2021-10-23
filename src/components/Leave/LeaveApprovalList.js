import React, { useState } from 'react'

import { CloseOutlined, CheckOutlined } from '@material-ui/icons'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'

import CustomButton from '../../components/CustomButton/CustomButton'
import PageLoading from '../../components/PageLoading/PageLoading'
import Pill from '../Pill'
import UpdatingIcon from '../../images/updating.svg'

import { deleteLeave, approveLeave } from '../../api/leaveAPI'
import {
  deleteLeaveRequest,
  deleteLeaveSuccess,
  deleteLeaveFail,
  approveLeaveRequest,
  approveLeaveSuccess,
  approveLeaveFail,
} from '../../actions/leaveAction'
import { useAppContext } from '../../AppContext'

import List from '../List'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 8,
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  overflowY: 'auto',
  padding: '20px 30px',
  background: '#f0f0f0',
  p: 4,
}

const LeaveApprovalList = () => {
  const {
    data: {
      leave: {
        all: { data: allLeaveList, deleting, approving, loading },
      },
    },
    dispatch,
  } = useAppContext()
  const [showDeleteConfirm, setShowDelete] = useState(false)
  const [deletingLeave, setDeletingLeave] = useState('')
  const [approvingLeave, setApprovingLeave] = useState('')

  const handleCloseConfirmDelete = () => setShowDelete(false)

  const handleShowConfirmDelete = id => {
    setDeletingLeave(id)
    setShowDelete(true)
  }

  const handleApproveLeave = async id => {
    setApprovingLeave(id)
    dispatch(approveLeaveRequest())
    try {
      const approvedLeave = await approveLeave({ leaveId: id })
      dispatch(approveLeaveSuccess(approvedLeave))
    } catch (err) {
      dispatch(approveLeaveFail(err.message))
    }
  }

  const handleSubmitDeleteLeave = async () => {
    dispatch(deleteLeaveRequest())
    try {
      const deletedLeave = await deleteLeave(deletingLeave)
      dispatch(deleteLeaveSuccess(deletedLeave))
      setShowDelete(false)
    } catch (err) {
      dispatch(deleteLeaveFail(err.message))
    }
  }
  const listData = allLeaveList?.map(item => {
    const dates = item.dates
      .map(d => (d.time.length === 2 ? d.date : `${d.date}(${d.time[0]})`))
      .flat()
      .sort()

    const duration = item.dates.reduce(
      (acc, d) => (d.time.length === 2 ? acc + 1 : acc + 0.5),
      0
    )

    const pillColorMapping = {
      pending: {
        background: '#fdf0e4',
        color: '#F2994A',
      },
      approved: {
        background: 'rgb(47,128,237,0.2)',
        color: '#2F80ED',
      },
    }

    return {
      Name: item?.user?.name,
      Date: dates.join(', '),
      'Duration (days)': duration,
      Type: item.type,
      Reason: item.reason,
      Status: (
        <Pill
          pillBg={pillColorMapping[item.status].background}
          pillColor={pillColorMapping[item.status].color}
          style={{ textTransform: 'capitalize' }}
        >
          {item.status}
        </Pill>
      ),
      Action: (
        <>
          <span
            className="action-icon"
            onClick={() => handleShowConfirmDelete(item._id)}
          >
            <CloseOutlined htmlColor="red" />
          </span>
          {item.status !== 'approved' && (
            <span
              className="action-icon"
              onClick={() => handleApproveLeave(item._id)}
            >
              {approving && approvingLeave === item._id ? (
                <img src={UpdatingIcon} alt="approving" />
              ) : (
                <CheckOutlined htmlColor="#0FCEC3" />
              )}
            </span>
          )}
        </>
      ),
    }
  })

  const ListResolver = d => {
    const result = { ...d }
    if (d.status) {
      result.Status = (
        <div pillBg="#fdf0e4" pillColor="#F2994A">
          {d.status}
        </div>
      )
    }
    return result
  }

  return (
    <div>
      {loading ? (
        <PageLoading />
      ) : (
        <List
          id="cui-sample-list-sortables"
          data={listData}
          toggleInnerContent={false}
          options={{
            styles: {
              Name: {
                '--itemWidth': '12%',
              },
              Status: {
                '--itemWidth': '15%',
                textAlign: 'center',
                alignContent: 'center',
              },
              Reason: {
                '--itemWidth': '15%',
                textAlign: 'center',
                alignContent: 'center',
              },
              Type: {
                textAlign: 'center',
                alignContent: 'center',
              },
              'Duration (days)': {
                '--itemWidth': '15%',
                alignContent: 'center',
                textAlign: 'center',
              },
              Action: {
                '--itemWidth': '10%',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'center',
              },
            },
          }}
          itemResolver={ListResolver}
        />
      )}

      <Modal
        className="leave-modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showDeleteConfirm}
        onClose={handleCloseConfirmDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showDeleteConfirm}>
          <Box sx={style}>
            <h4>Do you want to delete this record?</h4>
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <CustomButton
                textcolor="#333"
                style={{
                  border: '1px solid #0FCEC3',
                  width: '100%',
                  height: 40,
                }}
                hover={{
                  color: '#fff',
                  backgroundColor: '#00D1B2',
                  opacity: 0.8,
                }}
                disabled={deleting}
                onClick={handleCloseConfirmDelete}
              >
                No
              </CustomButton>
              <CustomButton
                textcolor="#fff"
                background="#0FCEC3"
                style={{
                  border: '1px solid #0FCEC3',
                  width: '100%',
                  height: 40,
                  marginLeft: 10,
                }}
                hover={{
                  color: '#fff',
                  backgroundColor: '#00D1B2',
                  opacity: 0.8,
                }}
                disabled={deleting}
                onClick={handleSubmitDeleteLeave}
              >
                {deleting ? 'Deleting...' : 'Yes'}
              </CustomButton>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default LeaveApprovalList
