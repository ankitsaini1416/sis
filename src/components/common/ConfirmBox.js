import { Box, Button, IconButton, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { X } from 'react-feather'
import { useTranslation } from 'react-i18next'

/**
 * Defines a component Confirm Box
 * @param props
 * @returns {*}
 * @constructor
 */

function ConfirmBox({ open, close, onConfirm, data, maxWidth, defaultProps }) {
  const { t } = useTranslation()
  const handleDelete = () => {
    onConfirm(data)
  }
  const handleClose = () => {
    close()
  }
  /**
   * Render JSX of  confirm Box modal
   */
  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={maxWidth}
    >
      <Formik>
        {() => {
          return (
            <>
              <Form>
                <DialogTitle disableTypography id="customized-dialog-title">
                  <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" tabIndex={0}>
                      <Box component="span" fontWeight="fontWeightBold">
                        {t('confirm')}
                      </Box>
                    </Typography>
                    <IconButton
                      aria-label="close"
                      className="close-button"
                      onClick={handleClose}
                      tabIndex={-1}
                    >
                      <X />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent tabIndex={0}>
                  <>{t(defaultProps.message)}</>
                </DialogContent>
                <DialogActions>
                  <Button
                    className="text-transform-none"
                    onClick={handleClose}
                    size="large"
                    variant="contained"
                    disableElevation
                    color="primary"
                  >
                    {t('cancel')}
                  </Button>

                  <Button
                    className="text-transform-none"
                    onClick={handleDelete}
                    color="secondary"
                    variant="contained"
                    size="large"
                    disableElevation
                  >
                    {t(defaultProps.buttonText)}
                  </Button>
                </DialogActions>
              </Form>
            </>
          )
        }}
      </Formik>
    </Dialog>
  )
}

ConfirmBox.propTypes = {
  data: PropTypes.object,
  onConfirm: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
  maxWidth: PropTypes.string,
  defaultProps: PropTypes.object,
}
ConfirmBox.defaultProps = {
  data: {},
  onConfirm: () => {},
  open: false,
  close: () => {},
  maxWidth: '',
  defaultProps: { message: 'archiveConfirmation', buttonText: 'archive' },
}

/**
 /**
 * Confirm Box modal component
 */
export default ConfirmBox
