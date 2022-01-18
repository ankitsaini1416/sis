import { Box, Button, Grid, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Plus, UserX } from 'react-feather'
import { useTranslation } from 'react-i18next'

import UploadImg from '../../../../assets/images/upload.png'
import ConfirmBox from '../../../common/ConfirmBox'
import useStyles from '../Enrollment.Style'
import AssignSuccessCoach from './AssignSuccessCoach'

function SuccessCoaches({
  allCoaches,
  assignSuccessCoach,
  successCoach,
  openDeletePopup,
  toggleDeletePopup,
  removeSuccessCoach,
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [assignCoach, setAssignCoach] = useState(false)

  const toggleAssignCoach = () => {
    setAssignCoach(!assignCoach)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={11} xl={10}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm="auto">
              <Typography component="h5" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight="600">
                  {t('successCoaches')}
                </Box>
              </Typography>
            </Grid>
            {isEmpty(successCoach) && (
              <Grid item xs="auto">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className="text-transform-none"
                  disableElevation
                  startIcon={<Plus width={20} height={20} />}
                  onClick={toggleAssignCoach}
                >
                  {t('assignSuccessCoach')}
                </Button>
              </Grid>
            )}
          </Grid>
          {!isEmpty(successCoach) && (
            <Box
              mt={4}
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection={{ xs: 'column', md: 'row' }}
            >
              <Box className={classes.successCoach} mb={{ xs: 2, md: 0 }}>
                <Box mx="auto" width="160px" borderRadius="100%" className="image-container">
                  <img
                    src={
                      successCoach.attributes?.avatar_full
                        ? successCoach.attributes?.avatar_full || UploadImg
                        : UploadImg
                    }
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = UploadImg
                    }}
                    alt="Success Coach"
                    tabIndex={0}
                  />
                </Box>
              </Box>

              <Box className={classes.successCoachDetail} pl={{ xs: 0, md: 3 }}>
                <Grid container spacing={3} justify="space-between">
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      component="h6"
                      variant="body2"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600">
                        {t('firstName')}
                      </Box>
                    </Typography>
                    <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                      <Box component="span" fontWeight={500}>
                        {successCoach.first_name}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      component="h6"
                      variant="body2"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600">
                        {t('lastName')}
                      </Box>
                    </Typography>
                    <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                      <Box component="span" fontWeight={500}>
                        {successCoach.last_name}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography
                      component="h6"
                      variant="body2"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600">
                        {t('assignedDate')}
                      </Box>
                    </Typography>
                    <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                      <Box component="span" fontWeight={500}>
                        {successCoach.sc_assigned_date}
                      </Box>
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} sm={6} md={3}>
                  <Typography component="h6" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('lastCommunication')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary">
                    <Box component="span" fontWeight={500}>
                      11/01/1968
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography component="h6" variant="body2" color="textPrimary" gutterBottom>
                    <Box component="span" fontWeight="600">
                      {t('about')}
                    </Box>
                  </Typography>
                  <Typography component="h6" variant="body2" color="textPrimary">
                    <Box component="span" fontWeight={500}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sapien, a sed
                      sed maecenas quis lectus. Eget est turpis a est elit. Iaculis adipiscing
                      sociis pretium aliquet scelerisque turpis aenean. Suspendisse aenean placerat
                      elementum ac egestas arcu.
                    </Box>
                  </Typography>
                </Grid> */}
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="text"
                      color="secondary"
                      className="text-transform-none"
                      disableElevation
                      startIcon={<UserX width={18} height={18} />}
                      onClick={toggleDeletePopup}
                    >
                      {t('removeCoach')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={removeSuccessCoach}
        defaultProps={{ message: 'removeSuccessCoachConfirmation', buttonText: 'remove' }}
      />
      <AssignSuccessCoach
        open={assignCoach}
        onClose={toggleAssignCoach}
        allCoaches={allCoaches}
        assignSuccessCoach={assignSuccessCoach}
      />
    </>
  )
}

SuccessCoaches.propTypes = {
  allCoaches: PropTypes.array,
  assignSuccessCoach: PropTypes.func,
  successCoach: PropTypes.object,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  removeSuccessCoach: PropTypes.func,
}

SuccessCoaches.defaultProps = {
  allCoaches: [],
  assignSuccessCoach: () => {},
  successCoach: {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  removeSuccessCoach: () => {},
}
export default SuccessCoaches
