import { Box, Button, Grid, Typography } from '@material-ui/core'
// import { Details } from '@material-ui/icons'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import PropTypes from 'prop-types'
import React from 'react'
import { CheckCircle, Edit2, XCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

// import { useParams } from 'react-router-dom'
import UploadImg from '../../../../assets/images/upload.png'
import { isEmpty } from '../../../../helpers/utils'
//import useStyles from '../Programs.Style'
import ProgramSkeleton from '../ProgramSkeleton'
import EditGeneralInformation from './EditGeneralInformation'

function GeneralInformationDetail({
  details,
  editProgram,
  getProgramsCategory,
  programsCategory,
  editLogo,
}) {
  //const classes = useStyles()
  const { t } = useTranslation()
  const [showEditProgram, setShowEditProgram] = React.useState(false)
  const toggleEditProgram = () => setShowEditProgram(!showEditProgram)
  // const { programId } = useParams()
  if (isEmpty(details)) {
    return <ProgramSkeleton />
  }
  return (
    <>
      {!showEditProgram ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            <Box
              mr={{ xs: 0, lg: 0, xl: 3 }}
              px={{ xs: 1, md: 2, lg: 3 }}
              py={{ xs: 3, sm: 3 }}
              className="profileSection"
              align="center"
              mb={{ xs: 3, sm: 3, lg: 0 }}
            >
              <Box
                mx="auto"
                width={{ xs: '200px', sm: '300px', md: '100%' }}
                borderRadius={8}
                className="image-container"
              >
                <img
                  src={details.pgm_logo || UploadImg}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = UploadImg
                  }}
                  alt="Program Logo"
                  tabIndex={0}
                />
              </Box>

              {/*<Typography
                component="h1"
                align="center"
                variant="h4"
                color="textPrimary"
                gutterBottom
              >
                <Box component="span" fontWeight="fontWeightMedium" fontSize="24px">
                  SCI-CHE-001
                </Box>
              </Typography>*/}
              <Box
                mt={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {details.pgm_is_active ? (
                  <Box
                    component="div"
                    mb={{ xs: 1, sm: 0 }}
                    mr={{ xs: 0, sm: 1 }}
                    className="button-label-success"
                    tabIndex={0}
                  >
                    <FiberManualRecordIcon fontSize="small" />
                    {t('active')}
                  </Box>
                ) : (
                  <Box
                    component="div"
                    mb={{ xs: 1, sm: 0 }}
                    mr={{ xs: 0, sm: 1 }}
                    className="button-label-error"
                    tabIndex={0}
                  >
                    <FiberManualRecordIcon fontSize="small" />
                    {t('inActive')}
                  </Box>
                )}
                <Button
                  className="text-transform-none"
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<Edit2 width="18px" />}
                  onClick={toggleEditProgram}
                >
                  {t('editProgram')}
                </Button>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection="column"
              mt={3}
              mr={{ xs: 0, lg: 3 }}
            >
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                  <Box fontWeight={500}>{t('canvasAccess')}</Box>
                </Typography>
                {details.pgm_canvas_access ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <XCircle className="text-grey" />
                )}
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                  <Box fontWeight={500}>{t('ttbAccess')}</Box>
                </Typography>
                {details.pgm_ttb_access ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <XCircle className="text-grey" />
                )}
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                  <Box fontWeight={500}>{t('requireTranscript')}</Box>
                </Typography>
                {details.pgm_require_transcript ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <XCircle className="text-grey" />
                )}
                {/*<CheckCircle
                  className={details.pgm_require_transcript ? 'text-success' : 'help-icon'}
                />*/}
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                  <Box fontWeight={500}>{t('showResult')}</Box>
                </Typography>
                {details.pgm_show_results ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <XCircle className="text-grey" />
                )}
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                  <Box fontWeight={500}>{t('fileAccess')}</Box>
                </Typography>
                {details.pgm_file_access ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <XCircle className="text-grey" />
                )}
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography component="span" variant="body2" color="textPrimary" tabIndex={0}>
                  <Box fontWeight={500}>{t('addToTemplate')}</Box>
                </Typography>
                {details.pgm_is_template_program ? (
                  <CheckCircle className="text-success" />
                ) : (
                  <XCircle className="text-grey" />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={8} xl={9}>
            <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
              <Typography component="" align="left" variant="body2" tabIndex={0}>
                <Box component="span" fontWeight="600" fontSize="16px">
                  {t('generalInformation')}
                </Box>
              </Typography>
              <Box mb={5} mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('programName')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.pgm_name}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('district')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.pgm_school?.sch_district?.dst_name}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('school')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.pgm_school?.sch_name}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('programCategory')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        component="span"
                        fontWeight="fontWeightRegular"
                        fontSize="16px"
                      >
                        <Box
                          mr={1}
                          className="color-box"
                          style={{
                            backgroundColor: details?.pgm_program_category?.pct_color_hex
                              ? details?.pgm_program_category?.pct_color_hex
                              : '#fff',
                          }}
                        >
                          {' '}
                        </Box>

                        {details.pgm_program_category?.pct_name}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('minimumAge')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {t('withyears', { Years: details.pgm_minimum_age })}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('transcriptGrade')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.pgm_transcript_grade}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('createdOn')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.createdTimeLabel}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('lastModified')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.updatedTimeLabel}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('programStartDate')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.createdPgmTimeLabel}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('programEndDate')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.updatedPgmTimeLabel}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('expiration')}
                      </Box>
                      <Box ml={1} component="span" className="optional">
                        ({t('expirationDays')})
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {t('withdays', { Days: details.pgm_expiration })}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('detailsDescription')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.pgm_description}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography
                      component="h6"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="600" fontSize="14px">
                        {t('preRequisite')}
                      </Box>
                    </Typography>
                    <Typography
                      component="h6"
                      align="left"
                      variant="subtitle2"
                      color="textPrimary"
                      gutterBottom
                      className="word-break"
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightRegular" fontSize="16px">
                        {details.pgm_prerequisites}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>
          <Box pb={{ xs: 0, sm: 3, lg: 4 }}>
            <Typography component="" align="left" variant="body2" tabIndex={0}>
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('generalInformation')}
              </Box>
            </Typography>
          </Box>
          <EditGeneralInformation
            toggleEditProgram={toggleEditProgram}
            details={details}
            editProgram={editProgram}
            getProgramsCategory={getProgramsCategory}
            programsCategory={programsCategory}
            editLogo={editLogo}
          />
        </>
      )}
    </>
  )
}
GeneralInformationDetail.propTypes = {
  details: PropTypes.object,
  editProgram: PropTypes.func,
  programsCategory: PropTypes.array,
  getProgramsCategory: PropTypes.func,
  editLogo: PropTypes.func,
}

GeneralInformationDetail.defaultProps = {
  details: {},
  editProgram: () => {},
  programsCategory: [],
  getProgramsCategory: () => {},
  editLogo: () => {},
}
export default GeneralInformationDetail
