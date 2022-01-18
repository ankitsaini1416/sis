import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import CertificatesDetail from './CertificatesDetail'
import Courses from './Courses'
import FeeStructureDetail from './FeeStructureDetail'
import FilesDetail from './FilesDetail'
import GeneralInformationDetail from './GeneralInformationDetail'
import LinkLibrary from './LinkLibrary'

const breadcrumbData = [
  {
    title: 'SIS',
    href: ROUTES.DASHBOARDLIST,
  },
  {
    title: 'Programs',
    href: ROUTES.PROGRAMS,
  },
  {
    title: 'All Programs',
    href: ROUTES.PROGRAMS,
  },
  {
    title: 'Program Details',
    href: '',
  },
]

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function DistrictDetails({
  details,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  editProgram,
  addLinkLibrary,
  programsCategory,
  getProgramsCategory,
  editLogo,
  deleteItems,
  toggleDeletePopup,
  openDeletePopup,
  addProgramFees,
  actionType,
  setActionType,
  getProgramFeeDetailById,
  programfeeDetail,
  addTranscripts,
  transcripts,
  addUpdateCourseGroup,
  courseGroupList,
  masterData,
  removeCourseGroup,
  getCourseGroupDetailById,
  courseGroupDetail,
  getCourseGroupItems,
  subjects,
  getCourseGroupItemById,
  courseGroupItem,
  removeCourseGroupItem,
  editCourseGroupItem,
  courses,
  searchCourses,
  addCourseGroupItem,
  courseFilter,
  setCourseFilterValue,
  resetCourseFilter,
  setCourses,
  deleteCertificateItems,
  deleteLinkItems,
  handleChange,
  value,
}) {
  const history = useHistory()
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('programDetails')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ( {details.pgm_name} )
              </Box>
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-end',
                md: 'space-between',
              }}
            >
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                startIcon={<ArrowLeft />}
                onClick={history.goBack}
              >
                {t('back')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
          className="custom-tabs"
        >
          <Tab tabIndex={0} label={t('generalInformation')} id="userTab-0" />
          <Tab tabIndex={0} label={t('certificateTranscripts')} id="userTab-1" />
          <Tab tabIndex={0} label={t('feeStructure')} id="userTab-2" />
          <Tab tabIndex={0} label={t('courses')} id="userTab-3" />
          <Tab tabIndex={0} label={t('linkLibrary')} id="userTab-4" />
          <Tab tabIndex={0} disabled label={t('programFiles')} id="userTab-5" />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <GeneralInformationDetail
            details={details}
            editProgram={editProgram}
            getProgramsCategory={getProgramsCategory}
            programsCategory={programsCategory}
            editLogo={editLogo}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CertificatesDetail
            addTranscripts={addTranscripts}
            transcripts={transcripts}
            details={details}
            openDeletePopup={openDeletePopup}
            toggleDeletePopup={toggleDeletePopup}
            deleteCertificateItems={deleteCertificateItems}
          />
        </TabPanel>
        <TabPanel index={value} value={2} dir={theme.direction} className="horizontal-tabs-2">
          <FeeStructureDetail
            details={details}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            toggleDeletePopup={toggleDeletePopup}
            openDeletePopup={openDeletePopup}
            deleteItems={deleteItems}
            addProgramFees={addProgramFees}
            actionType={actionType}
            setActionType={setActionType}
            getProgramFeeDetailById={getProgramFeeDetailById}
            programfeeDetail={programfeeDetail}
          />
        </TabPanel>
        <TabPanel index={value} value={3} dir={theme.direction} className="horizontal-tabs-2">
          <Courses
            actionType={actionType}
            setActionType={setActionType}
            addUpdateCourseGroup={addUpdateCourseGroup}
            courseGroupList={courseGroupList}
            masterData={masterData}
            removeCourseGroup={removeCourseGroup}
            getCourseGroupDetailById={getCourseGroupDetailById}
            courseGroupDetail={courseGroupDetail}
            getCourseGroupItems={getCourseGroupItems}
            subjects={subjects}
            getCourseGroupItemById={getCourseGroupItemById}
            courseGroupItem={courseGroupItem}
            removeCourseGroupItem={removeCourseGroupItem}
            editCourseGroupItem={editCourseGroupItem}
            courses={courses}
            searchCourses={searchCourses}
            addCourseGroupItem={addCourseGroupItem}
            courseFilter={courseFilter}
            setCourseFilterValue={setCourseFilterValue}
            resetCourseFilter={resetCourseFilter}
            setCourses={setCourses}
          />
        </TabPanel>
        <TabPanel index={value} value={4} dir={theme.direction}>
          <LinkLibrary
            addLinkLibrary={addLinkLibrary}
            details={details}
            toggleDeletePopup={toggleDeletePopup}
            openDeletePopup={openDeletePopup}
            deleteLinkItems={deleteLinkItems}
          />
        </TabPanel>
        <TabPanel index={value} value={5} dir={theme.direction} className="horizontal-tabs-2">
          <FilesDetail />
        </TabPanel>
      </Paper>
    </>
  )
}
DistrictDetails.propTypes = {
  details: PropTypes.object,
  editProgram: PropTypes.func,
  addLinkLibrary: PropTypes.func,
  getProgramsCategory: PropTypes.func,
  programsCategory: PropTypes.array,
  editLogo: PropTypes.func,
  order: PropTypes.func,
  orderBy: PropTypes.func,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  toggleDeletePopup: PropTypes.func,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  addProgramFees: PropTypes.func,
  actionType: PropTypes.func,
  setActionType: PropTypes.func,
  getProgramFeeDetailById: PropTypes.func,
  programfeeDetail: PropTypes.object,
  addTranscripts: PropTypes.func,
  transcripts: PropTypes.array,
  addUpdateCourseGroup: PropTypes.func,
  courseGroupList: PropTypes.array,
  masterData: PropTypes.object,
  removeCourseGroup: PropTypes.func,
  getCourseGroupDetailById: PropTypes.func,
  courseGroupDetail: PropTypes.object,
  getCourseGroupItems: PropTypes.func,
  subjects: PropTypes.array,
  getCourseGroupItemById: PropTypes.func,
  courseGroupItem: PropTypes.array,
  removeCourseGroupItem: PropTypes.func,
  editCourseGroupItem: PropTypes.func,
  courses: PropTypes.array,
  searchCourses: PropTypes.func,
  addCourseGroupItem: PropTypes.func,
  courseFilter: PropTypes.object,
  setCourseFilterValue: PropTypes.func,
  resetCourseFilter: PropTypes.func,
  setCourses: PropTypes.func,
  deleteCertificateItems: PropTypes.func,
  deleteLinkItems: PropTypes.func,
  handleChange: PropTypes.func,
  value: PropTypes.func,
}

DistrictDetails.defaultProps = {
  details: {},
  editProgram: () => {},
  addLinkLibrary: () => {},
  getProgramsCategory: () => {},
  programsCategory: [],
  editLogo: () => {},
  order: () => {},
  orderBy: () => {},
  setOrder: () => {},
  setOrderBy: () => {},
  toggleDeletePopup: () => {},
  deleteItems: () => {},
  openDeletePopup: false,
  addProgramFees: () => {},
  actionType: () => {},
  setActionType: () => {},
  getProgramFeeDetailById: () => {},
  programfeeDetail: {},
  addTranscripts: () => {},
  transcripts: [],
  addUpdateCourseGroup: () => {},
  courseGroupList: [],
  masterData: {},
  removeCourseGroup: () => {},
  getCourseGroupDetailById: () => {},
  courseGroupDetail: {},
  getCourseGroupItems: () => {},
  subjects: [],
  getCourseGroupItemById: () => {},
  courseGroupItem: [],
  removeCourseGroupItem: () => {},
  editCourseGroupItem: () => {},
  courses: [],
  searchCourses: () => {},
  addCourseGroupItem: () => {},
  courseFilter: {},
  setCourseFilterValue: () => {},
  resetCourseFilter: () => {},
  setCourses: () => {},
  deleteCertificateItems: () => {},
  deleteLinkItems: () => {},
  handleChange: () => {},
  value: () => {},
}
export default DistrictDetails
