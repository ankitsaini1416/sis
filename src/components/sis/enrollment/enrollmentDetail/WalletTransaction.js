import { Box, Button, Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ArrowDownRight, ArrowUpLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'

import useStyles from '../Enrollment.Style'
import AddMoney from './AddMoney'

function WalletTransactions({
  addWalletPoints,
  wallet,
  transactions,
  onChangePageWallet,
  pageDetails,
  walletTransactionsList,
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const breakpoint = useMediaQuery('(max-width:767px)')

  const [addMoneyModal, setAddMoneyModal] = useState(false)

  const toggleAddMoney = () => {
    setAddMoneyModal(!addMoneyModal)
  }

  const status = (row) => {
    if (row.status_text === 'APPROVED') {
      return (
        <Box tabIndex={0} component="span" className="label-green" id={row.id}>
          {t('success')}
        </Box>
      )
    } else {
      return (
        <Box tabIndex={0} component="span" className="label-red" id={row.id}>
          {t('failed')}
        </Box>
      )
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={10} xl={8}>
          <Box
            width="100%"
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Box
              width={{ xs: '100%', sm: 'auto' }}
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection="row"
            >
              <Box mr={{ xs: 2, sm: 3 }}>
                <Typography
                  component="h6"
                  variant="body2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight={600}>
                    {t('walletBalance')}
                  </Box>
                </Typography>
                <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                  <Box component="span" fontWeight={400}>
                    {t('with$', { amount: wallet.points_balance })}
                  </Box>
                </Typography>
              </Box>
              <Box>
                <Typography
                  component="h6"
                  variant="body2"
                  color="textPrimary"
                  gutterBottom
                  tabIndex={0}
                >
                  <Box component="span" fontWeight={600}>
                    {t('walletID')}
                  </Box>
                </Typography>
                <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                  <Box component="span" fontWeight={400}>
                    {wallet.id}
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box mt={{ xs: 1, sm: 0 }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                disableElevation
                className="text-transform-none"
                onClick={toggleAddMoney}
              >
                {t('addMoney')}
              </Button>
            </Box>
          </Box>
          {Object.keys(transactions).map((key) => (
            <Box key={key} mt={2}>
              <Typography
                tabIndex={0}
                component="h6"
                variant="body2"
                color="textPrimary"
                gutterBottom
              >
                <Box component="span" fontWeight={600}>
                  {key}
                </Box>
              </Typography>
              {transactions[key].map((row) => {
                return (
                  <Box
                    display="flex"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    mt={1}
                    className="border-box"
                    p={{ xs: 1, sm: 2 }}
                    width="100%"
                    key={row.id}
                  >
                    {row.payment_type === 'credit' ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className="wallet-icon"
                        p={{ xs: 0.5, sm: 1 }}
                        width={{ xs: '25px', sm: '40px' }}
                        height={{ xs: '25px', sm: '40px' }}
                      >
                        <ArrowDownRight />
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className="wallet-icon"
                        p={{ xs: 0.5, sm: 1 }}
                        width={{ xs: '25px', sm: '40px' }}
                        height={{ xs: '25px', sm: '40px' }}
                      >
                        <ArrowUpLeft />
                      </Box>
                    )}
                    <Box pl={{ xs: 1, sm: 2 }} className={classes.walletDetail}>
                      <Grid container spacing={2} justify="space-between" alignItems="center">
                        <Grid item xs={12} sm={8} md={7}>
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                            tabIndex={0}
                          >
                            <Box component="span" fontWeight={600}>
                              {row.reason}
                            </Box>
                          </Typography>
                          <Box
                            flexDirection={breakpoint ? 'column' : 'row'}
                            className={classes.courseInfo + ' course-info'}
                          >
                            <Box
                              tabIndex={0}
                              display="flex"
                              alignItems="center"
                              mr={2}
                              position="relative"
                            >
                              <Box fontSize={12} fontWeight={500} className="icon-color-light">
                                {t('transactionID') + ' :'}
                              </Box>
                              <Box
                                className="color-text-primary"
                                fontSize={12}
                                ml={0.5}
                                fontWeight={500}
                              >
                                {row.wallet_transaction_id}
                              </Box>
                            </Box>
                            <Box
                              tabIndex={0}
                              display="flex"
                              alignItems="center"
                              position="relative"
                            >
                              <Box fontSize={12} fontWeight={500} className="icon-color-light">
                                {t('transactionDate') + ' :'}
                              </Box>
                              <Box
                                className="color-text-primary"
                                fontSize={12}
                                ml={0.5}
                                fontWeight={500}
                              >
                                {row.created_at}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={2} md={3} className="align-center">
                          <Typography
                            component="h6"
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                          >
                            <Box tabIndex={0} component="span" fontWeight={500}>
                              {t('amount')}
                            </Box>
                          </Typography>
                          {row.payment_type === 'credit' ? (
                            <Typography
                              tabIndex={0}
                              component="h6"
                              variant="body2"
                              className="text-green"
                            >
                              <Box component="span" fontWeight={600}>
                                + {t('with$', { amount: row.points })}
                              </Box>
                            </Typography>
                          ) : (
                            <Typography
                              tabIndex={0}
                              component="h6"
                              variant="body2"
                              className="text-secondary"
                            >
                              <Box component="span" fontWeight={600}>
                                - {t('with$', { amount: row.points })}
                              </Box>
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={6} sm={2} md={2} className="align-right">
                          <Box mb={0.5} component="span">
                            {status(row)}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          ))}
          {walletTransactionsList.length > 0 && (
            <Box
              display="flex"
              py={2}
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems="center"
            >
              <Pagination
                count={pageDetails.last_page}
                shape="rounded"
                color="primary"
                onChange={onChangePageWallet}
                page={pageDetails.current_page}
                variant="text"
                className="custom-pagination"
              />
              <Box mt={{ xs: 1, sm: 0 }}>
                <Typography tabIndex={0} component="p" variant="body2">
                  Showing {walletTransactionsList.length} rows out of {pageDetails.total}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <AddMoney open={addMoneyModal} onClose={toggleAddMoney} addWalletPoints={addWalletPoints} />
    </>
  )
}
WalletTransactions.propTypes = {
  addWalletPoints: PropTypes.func,
  wallet: PropTypes.object,
  transactions: PropTypes.array,
  onChangePageWallet: PropTypes.func,
  pageDetails: PropTypes.object,
  walletTransactionsList: PropTypes.object,
}

WalletTransactions.defaultProps = {
  addWalletPoints: () => {},
  wallet: {},
  transactions: [],
  onChangePageWallet: () => {},
  pageDetails: {},
  walletTransactionsList: {},
}

export default WalletTransactions
