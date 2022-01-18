import '../../../../assets/styles/EnrollmentStatus.scss'

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft, Check } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import UploadImg from '../../../../assets/images/upload.png'
import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import useStyles from '../Enrollment.Style'
import AssignedCourse from './AssignedCourse'
import AssignNewCourse from './AssignNewCourse'
import EnrollmentDetailsSkeleton from './EnrollmentDetailSkeleton'
import Notes from './Notes'
import PaymentDetail from './PaymentDetail'
import ProgramDetail from './ProgramDetails'
import SuccessCoaches from './SuccessCoaches'
import WalletTransactions from './WalletTransaction'
const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={{ xs: 2, sm: 3 }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function EnrollmentsDetails({
  masterData,
  actionType,
  setActionType,
  pageDetails,
  enrollmentDetail,
  orderTransaction,
  orderByTransaction,
  setOrderTransaction,
  setOrderByTransaction,
  transactionFilter,
  setTransactionFilterValue,
  onApplyFilterTransaction,
  onTransactionFilterReset,
  onChangePageTransaction,
  onChangePageWallet,
  onSearchEnterTransaction,
  transactionList,
  transactionDetail,
  getTransactionDetailById,
  orderStudentNote,
  orderByStudentNote,
  setOrderStudentNote,
  setOrderByStudentNote,
  studentNoteFilter,
  setStudentNoteFilterValue,
  onApplyFilterStudentNote,
  onStudentNoteFilterReset,
  onChangePageStudentNote,
  onStudentNoteSearchEnter,
  studentNoteList,
  getStudentNoteDetailById,
  studentNoteDetail,
  addEditStudentNote,
  allCoaches,
  assignSuccessCoach,
  successCoach,
  removeSuccessCoach,
  openDeletePopup,
  toggleDeletePopup,
  fetchCourseOnScroll,
  enrollmentCourses,
  getProgramsCategory,
  selectedProgramGroupDetails,
  courseItem,
  searchText,
  setSearchValue,
  onSearchEnter,
  programCourseGroupList,
  getCourseGroupItems,
  updateEnrolledCourse,
  toggleCourseCheck,
  onSearchItemEnter,
  fetchCourseItemOnScroll,
  onApplyFilter,
  onApplyEnrolledFilter,
  addWalletPoints,
  wallet,
  transactions,
  editEnrollmentStatus,
  editCourseDetails,
  walletTransactionsList,
  uiState,
  onChangeStep,
  setCourseFilterValue,
  enrollmentCourseFilter,
  walletPageDetails,
  userDetail,
  fetchDownloadTranscript,
  instructors,
}) {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const theme = useTheme()
  const [assignNewCourse, setAssignNewCourse] = React.useState(false)
  const assignCourseToggle = () => setAssignNewCourse(!assignNewCourse)

  const handleStatus = (event) => {
    editEnrollmentStatus(event.target.value)
  }

  const [checked, setChecked] = React.useState(true)

  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked)
  }
  const breadcrumbData = [
    {
      title: 'SIS',
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbEnrollment'),
      href: ROUTES.ALLENROLLMENTS,
    },
    {
      title: t('breadcrumbAllEnrollments'),
      href: ROUTES.ALLENROLLMENTS,
    },
    {
      title: t('breadcrumbEnrollmentDetail'),
      href: '',
    },
  ]
  if (isEmpty(userDetail)) {
    return <EnrollmentDetailsSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('enrollmentDetails')}
              </Box>
              <Box
                ml={1}
                component="span"
                fontWeight="500"
                fontSize="20px"
                className="user-name"
                tabIndex={0}
              >
                ({userDetail.fullName})
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
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
      <Paper rounded={true} elevation={1} className={classes.studentBox + ' paper-round'}>
        <Box p={3}>
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <Box display="flex" alignItems="center">
                <Box component="span">
                  <Avatar alt="student avatar" src={userDetail.avatar || UploadImg} tabIndex="0" />
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="body2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600">
                      {t('studentName')}
                    </Box>
                  </Typography>
                  <Typography
                    className="word-break"
                    component="p"
                    align="left"
                    variant="body1"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    {userDetail.fullName}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <Box display="flex" alignItems="center">
                <Box component="span">
                  <Avatar
                    alt="District Logo"
                    src={enrollmentDetail.enr_school?.sch_district?.dst_logo || UploadImg}
                    tabIndex="0"
                  />
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="body2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600">
                      {t('districtName')}
                    </Box>
                  </Typography>
                  <Typography
                    className="word-break"
                    component="p"
                    align="left"
                    variant="body1"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    {enrollmentDetail.enr_school?.sch_district?.dst_name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <Box display="flex" alignItems="center">
                <Box component="span">
                  <Avatar
                    alt="School Logo"
                    src={enrollmentDetail.enr_school?.sch_logo || UploadImg}
                    tabIndex="0"
                  />
                </Box>
                <Box ml={2}>
                  <Typography
                    component="h6"
                    align="left"
                    variant="body2"
                    color="textPrimary"
                    gutterBottom
                    tabIndex={0}
                  >
                    <Box component="span" fontWeight="600">
                      {t('schoolName')}
                    </Box>
                  </Typography>
                  <Typography
                    className="word-break"
                    component="p"
                    align="left"
                    variant="body1"
                    color="textPrimary"
                    tabIndex={0}
                  >
                    {enrollmentDetail.enr_school?.sch_name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <Typography
                component="h6"
                align="left"
                variant="body2"
                color="textPrimary"
                gutterBottom
                tabIndex={0}
              >
                <Box component="span" fontWeight="600">
                  {t('studentId')}
                </Box>
              </Typography>
              <Typography
                component="p"
                align="left"
                variant="body1"
                color="textPrimary"
                tabIndex={0}
              >
                {enrollmentDetail.enr_student?.attributes?.public_id?.values[0]}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} lg="auto">
              <Typography
                component="h6"
                align="left"
                variant="body2"
                color="textPrimary"
                gutterBottom
              >
                <Box component="span" fontWeight="600" tabIndex="0">
                  {t('lastModifiedDate')}
                </Box>
              </Typography>
              <Typography
                component="p"
                align="left"
                variant="body1"
                color="textPrimary"
                tabIndex="0"
              >
                {enrollmentDetail.updated_at}
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <Box className="custom-checkbox custom-checkbox-button">
                <FormControlLabel
                  control={
                    <CheckboxWithGreenCheck
                      checked={checked}
                      onChange={handleChangeCheckbox}
                      value="checkedA"
                      checkedIcon={<Check aria-label={t('markAs')} />}
                      color="Primary"
                    />
                  }
                  disabled
                  label={t('fields:actionRequired')}
                  aria-label={t('fields:actionRequired')}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg="auto">
              <TextField
                className={'select-' + enrollmentDetail.enr_status + ' contained-select-field'}
                id="enr_status"
                name="enr_status"
                select
                onChange={handleStatus}
                value={enrollmentDetail.enr_status || ''}
                variant="outlined"
                size={'small'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Check width={18} height={18} />
                    </InputAdornment>
                  ),
                }}
                label={<span style={visuallyHidden}>({t('fields:status')})</span>}
              >
                {masterData.enrollment_status?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {t(`reference:${item}`)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Tabs
          value={uiState.enrollmentDetail.activeTab}
          onChange={onChangeStep}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
          className="custom-tabs"
        >
          <Tab label={t('programDetails')} id="userTab-0" />
          <Tab label={t('courses')} id="userTab-1" aria-label={t('courses')} />
          <Tab label={t('paymentDetails')} id="userTab-2" />
          <Tab label={t('walletTransactions')} id="userTab-3" />
          <Tab label={t('successCoaches')} id="userTab-4" />
          <Tab label={t('notes')} id="userTab-5" />
        </Tabs>

        <TabPanel
          value={uiState.enrollmentDetail.activeTab}
          index={0}
          dir={theme.direction}
          className="horizontal-tabs-2"
        >
          <ProgramDetail
            enrollmentDetail={enrollmentDetail}
            fetchDownloadTranscript={fetchDownloadTranscript}
          />
        </TabPanel>
        <TabPanel value={uiState.enrollmentDetail.activeTab} index={1} dir={theme.direction}>
          {!assignNewCourse ? (
            <AssignedCourse
              assignCourseToggle={assignCourseToggle}
              fetchCourseOnScroll={fetchCourseOnScroll}
              enrollmentCourses={enrollmentCourses}
              courseItem={courseItem}
              getProgramsCategory={getProgramsCategory}
              onSearchEnter={onSearchEnter}
              onApplyFilter={onApplyFilter}
              editCourseDetails={editCourseDetails}
              masterData={masterData}
              filter={enrollmentCourseFilter}
              setFilterValue={setCourseFilterValue}
              instructors={instructors}
            />
          ) : (
            <AssignNewCourse
              assignCourseToggle={assignCourseToggle}
              fetchCourseOnScroll={fetchCourseItemOnScroll}
              programCourseGroupList={programCourseGroupList}
              getCourseGroupItems={getCourseGroupItems}
              courseItem={courseItem}
              selectedProgramGroupDetails={selectedProgramGroupDetails}
              searchText={searchText}
              setSearchValue={setSearchValue}
              onSearchEnter={onSearchItemEnter}
              updateEnrolledCourse={updateEnrolledCourse}
              toggleCourseCheck={toggleCourseCheck}
              onApplyEnrolledFilter={onApplyEnrolledFilter}
            />
          )}
        </TabPanel>
        <TabPanel
          index={2}
          value={uiState.enrollmentDetail.activeTab}
          dir={theme.direction}
          className="horizontal-tabs-2"
        >
          <PaymentDetail
            order={orderTransaction}
            orderBy={orderByTransaction}
            setOrder={setOrderTransaction}
            setOrderBy={setOrderByTransaction}
            transactionList={transactionList}
            pageDetails={pageDetails}
            getTransactionDetailById={getTransactionDetailById}
            transactionDetail={transactionDetail}
            enrollmentDetail={enrollmentDetail}
            onChangePage={onChangePageTransaction}
            onSearchEnter={onSearchEnterTransaction}
            onApplyFilter={onApplyFilterTransaction}
            filter={transactionFilter}
            setFilterValue={setTransactionFilterValue}
            onFilterReset={onTransactionFilterReset}
          />
        </TabPanel>
        <TabPanel index={3} value={uiState.enrollmentDetail.activeTab} dir={theme.direction}>
          <WalletTransactions
            addWalletPoints={addWalletPoints}
            wallet={wallet}
            transactions={transactions}
            onChangePageWallet={onChangePageWallet}
            pageDetails={walletPageDetails}
            walletTransactionsList={walletTransactionsList}
          />
        </TabPanel>
        <TabPanel index={4} value={uiState.enrollmentDetail.activeTab} dir={theme.direction}>
          <SuccessCoaches
            successCoach={successCoach}
            allCoaches={allCoaches}
            assignSuccessCoach={assignSuccessCoach}
            removeSuccessCoach={removeSuccessCoach}
            openDeletePopup={openDeletePopup}
            toggleDeletePopup={toggleDeletePopup}
          />
        </TabPanel>
        <TabPanel
          index={5}
          value={uiState.enrollmentDetail.activeTab}
          dir={theme.direction}
          className="horizontal-tabs-2"
        >
          <Notes
            order={orderStudentNote}
            orderBy={orderByStudentNote}
            setOrder={setOrderStudentNote}
            setOrderBy={setOrderByStudentNote}
            onChangePage={onChangePageStudentNote}
            onSearchEnter={onStudentNoteSearchEnter}
            onApplyFilter={onApplyFilterStudentNote}
            filter={studentNoteFilter}
            setFilterValue={setStudentNoteFilterValue}
            onFilterReset={onStudentNoteFilterReset}
            studentNoteList={studentNoteList}
            pageDetails={pageDetails}
            getStudentNoteDetailById={getStudentNoteDetailById}
            studentNoteDetail={studentNoteDetail}
            actionType={actionType}
            setActionType={setActionType}
            addEditStudentNote={addEditStudentNote}
            masterData={masterData}
          />
        </TabPanel>
      </Paper>
    </>
  )
}

EnrollmentsDetails.propTypes = {
  orderTransaction: PropTypes.string,
  orderByTransaction: PropTypes.string,
  setOrderTransaction: PropTypes.func,
  setOrderByTransaction: PropTypes.func,
  orderStudentNote: PropTypes.string,
  setOrderStudentNote: PropTypes.func,
  orderByStudentNote: PropTypes.string,
  setOrderByStudentNote: PropTypes.func,
  transactionFilter: PropTypes.object,
  studentNoteFilter: PropTypes.object,
  onChangePageTransaction: PropTypes.func,
  onChangePageStudentNote: PropTypes.func,
  onChangePageWallet: PropTypes.func,
  onSearchEnterTransaction: PropTypes.func,
  onStudentNoteSearchEnter: PropTypes.func,
  onApplyFilterTransaction: PropTypes.func,
  onApplyFilterStudentNote: PropTypes.func,
  setTransactionFilterValue: PropTypes.func,
  setStudentNoteFilterValue: PropTypes.func,
  onTransactionFilterReset: PropTypes.func,
  onStudentNoteFilterReset: PropTypes.func,
  enrollmentDetail: PropTypes.object,
  transactionList: PropTypes.array,
  transactionDetail: PropTypes.object,
  getTransactionDetailById: PropTypes.func,
  studentNoteList: PropTypes.array,
  pageDetails: PropTypes.object,
  getStudentNoteDetailById: PropTypes.func,
  studentNoteDetail: PropTypes.object,
  actionType: PropTypes.func,
  setActionType: PropTypes.func,
  addEditStudentNote: PropTypes.func,
  allCoaches: PropTypes.array,
  assignSuccessCoach: PropTypes.func,
  masterData: PropTypes.object,
  successCoach: PropTypes.object,
  removeSuccessCoach: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  fetchCourseOnScroll: PropTypes.func,
  enrollmentCourses: PropTypes.array,
  courseItem: PropTypes.object,
  getProgramsCategory: PropTypes.func,
  searchText: PropTypes.string,
  setSearchValue: PropTypes.func,
  onSearchEnter: PropTypes.func,
  programCourseGroupList: PropTypes.array,
  getCourseGroupItems: PropTypes.func,
  selectedProgramGroupDetails: PropTypes.object,
  updateEnrolledCourse: PropTypes.func,
  toggleCourseCheck: PropTypes.func,
  updateCourse: PropTypes.func,
  onSearchItemEnter: PropTypes.func,
  fetchCourseItemOnScroll: PropTypes.func,
  onApplyFilter: PropTypes.func,
  onApplyEnrolledFilter: PropTypes.func,
  addWalletPoints: PropTypes.func,
  wallet: PropTypes.object,
  transactions: PropTypes.array,
  editEnrollmentStatus: PropTypes.func,
  editCourseDetails: PropTypes.func,
  walletTransactionsList: PropTypes.object,
  uiState: PropTypes.object,
  onChangeStep: PropTypes.func,
  setCourseFilterValue: PropTypes.func,
  enrollmentCourseFilter: PropTypes.object,
  walletPageDetails: PropTypes.object,
  userDetail: PropTypes.object,
  fetchDownloadTranscript: PropTypes.func,
  instructors: PropTypes.object,
}

EnrollmentsDetails.defaultProps = {
  orderTransaction: '',
  orderByTransaction: '',
  setOrderTransaction: () => {},
  setOrderByTransaction: () => {},
  orderByStudentNote: '',
  orderStudentNote: '',
  setOrderStudentNote: () => {},
  setOrderByStudentNote: () => {},
  transactionFilter: {},
  studentNoteFilter: {},
  setTransactionFilterValue: () => {},
  setStudentNoteFilterValue: () => {},
  onTransactionFilterReset: () => {},
  onStudentNoteFilterReset: () => {},
  onChangePageTransaction: () => {},
  onChangePageStudentNote: () => {},
  onChangePageWallet: () => {},
  onSearchEnterTransaction: () => {},
  onStudentNoteSearchEnter: () => {},
  onApplyFilterTransaction: () => {},
  onApplyFilterStudentNote: () => {},
  enrollmentDetail: {},
  transactionList: [],
  transactionDetail: {},
  getTransactionDetailById: () => {},
  studentNoteList: [],
  pageDetails: {},
  getStudentNoteDetailById: () => {},
  studentNoteDetail: {},
  actionType: () => {},
  setActionType: () => {},
  addEditStudentNote: () => {},
  allCoaches: [],
  assignSuccessCoach: () => {},
  masterData: {},
  successCoach: {},
  removeSuccessCoach: () => {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  fetchCourseOnScroll: () => {},
  getProgramsCategory: () => {},
  enrollmentCourses: [],
  courseItem: {},
  searchText: '',
  setSearchValue: () => {},
  onSearchEnter: () => {},
  programCourseGroupList: [],
  getCourseGroupItems: () => {},
  selectedProgramGroupDetails: {},
  updateEnrolledCourse: () => {},
  toggleCourseCheck: () => {},
  onSearchItemEnter: () => {},
  fetchCourseItemOnScroll: () => {},
  onApplyFilter: () => {},
  onApplyEnrolledFilter: () => {},
  addWalletPoints: () => {},
  wallet: {},
  transactions: [],
  editEnrollmentStatus: () => {},
  editCourseDetails: () => {},
  walletTransactionsList: {},
  uiState: {},
  onChangeStep: () => {},
  setCourseFilterValue: () => {},
  enrollmentCourseFilter: {},
  walletPageDetails: {},
  userDetail: {},
  fetchDownloadTranscript: () => {},
  instructors: {},
}

export default EnrollmentsDetails
