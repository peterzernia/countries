import React from 'react'
import { func, bool } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const NotAuthModal = ({ closeNotAuthModal, showNotAuthModal }) => (
  <Dialog onClose={closeNotAuthModal} open={showNotAuthModal}>
    <DialogContent>
      <DialogContentText>
        You must be logged in to do that.
      </DialogContentText>
      <DialogActions>
        <Button onClick={() => closeNotAuthModal()} variant="contained" color="primary">
        Close
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
)

export default NotAuthModal

NotAuthModal.propTypes = {
  closeNotAuthModal: func.isRequired,
  showNotAuthModal: bool.isRequired,
}
