import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React from 'react'
import { X } from 'react-feather'
import { useTranslation } from 'react-i18next'

function TransactionDetail({ open, onClose, transactionDetail }) {
  const { t } = useTranslation()

  const status = () => {
    if (transactionDetail.txn_status === 'approved') {
      return (
        <Box component="span" className="label-green" id={transactionDetail.txn_id} tabIndex={0}>
          {t('success')}{' '}
        </Box>
      )
    } else if (transactionDetail.txn_status === 'pending') {
      return (
        <Box component="span" className="label-warning" id={transactionDetail.txn_id} tabIndex={0}>
          {t('pending')}
        </Box>
      )
    } else {
      return (
        <Box component="span" className="label-red" id={transactionDetail.txn_id} tabIndex={0}>
          {t('failed')}
        </Box>
      )
    }
  }

  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
        <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" tabIndex={0}>
            <Box component="span" fontWeight="fontWeightBold">
              {t('transactionDetails')}
            </Box>
          </Typography>
          {onClose ? (
            <IconButton aria-label="close" className="close-button" onClick={onClose}>
              <X />
            </IconButton>
          ) : null}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box pb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('amount')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {t('with$', { amount: transactionDetail.txn_amount })}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('transactionDate')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {transactionDetail.created_at}
                </Box>
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('name')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {transactionDetail.txn_name}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('email')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  <Tooltip title={`${transactionDetail.txn_email}`}>
                    <a
                      className="link-color-text text-ellipsis"
                      href={`mailto:${transactionDetail.txn_email}`}
                    >
                      {transactionDetail.txn_email}
                    </a>
                  </Tooltip>
                </Box>
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('transactionID')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {transactionDetail.txn_key}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('paymentMethod')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {transactionDetail.txn_payment_source}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                component="h6"
                variant="body2"
                color="textPrimary"
                gutterBottom
                tabIndex={0}
              >
                <Box component="span" fontWeight={600}>
                  {t('status')}
                </Box>
              </Typography>

              {status()}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

TransactionDetail.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  transactionDetail: PropTypes.object,
  enrollmentDetail: PropTypes.object,
}

TransactionDetail.defaultProps = {
  open: false,
  onClose: () => {},
  transactionDetail: {},
  enrollmentDetail: {},
}

export default TransactionDetail
