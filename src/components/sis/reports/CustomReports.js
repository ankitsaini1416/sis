import { Box, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../helpers/constants'
import Breadcrumb from '../../breadcrumbs/Breadcrumbs'
import InstructerGenericReport from './InstructerGenericReports'
import StudentGenericReport from './StudentGenericReports'
import SuccessCoachGenericReport from './SuccessCoachGenericReports'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function CustomReport({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  pageDetails,
  studentGenericFilter,
  setStudentFilterValue,
  onApplyStudentFilter,
  onStudentFilterReset,
  onChangeStudentPage,
  successCoachFilter,
  setSuccessCoachFilter,
  onApplySuccessCoachFilter,
  onSuccessCoachFilterReset,
  successCoachPageDetails,
  onChangeSuccessCoachPage,
  instructerFilter,
  setInstructerFilter,
  onApplyInstructerFilter,
  onInstructerFilterReset,
  onChangeInstructerPage,
  districts,
  schools,
  fetchSchool,
  genericStudentReportList,
  successCoachReportList,
  instructerReportList,
  masterData,
  programList,
}) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('reports'),
      href: ROUTES.CUSTOMREPORTS,
    },
    {
      title: t('customReport'),
      href: '',
    },
  ]

  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('customReport')}
              </Box>
            </Typography>
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
          <Tab label={t('studentGeneric')} id="userTab-0" tabIndex={0} />
          <Tab label={t('successCoachGeneric')} id="userTab-1" tabIndex={0} />
          <Tab label={t('instructorGeneric')} id="userTab-2" tabIndex={0} />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <StudentGenericReport
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            filter={studentGenericFilter}
            setFilterValue={setStudentFilterValue}
            onApplyFilter={onApplyStudentFilter}
            onFilterReset={onStudentFilterReset}
            pageDetails={pageDetails}
            onChangePage={onChangeStudentPage}
            schools={schools}
            districts={districts}
            genericStudentReportList={genericStudentReportList}
            masterData={masterData}
            programList={programList}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SuccessCoachGenericReport
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            filter={successCoachFilter}
            setFilterValue={setSuccessCoachFilter}
            onApplyFilter={onApplySuccessCoachFilter}
            onFilterReset={onSuccessCoachFilterReset}
            pageDetails={successCoachPageDetails}
            onChangePage={onChangeSuccessCoachPage}
            fetchSchool={fetchSchool}
            schools={schools}
            districts={districts}
            successCoachReportList={successCoachReportList}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <InstructerGenericReport
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            filter={instructerFilter}
            setFilterValue={setInstructerFilter}
            onApplyFilter={onApplyInstructerFilter}
            onFilterReset={onInstructerFilterReset}
            pageDetails={pageDetails}
            onChangePage={onChangeInstructerPage}
            fetchSchool={fetchSchool}
            schools={schools}
            districts={districts}
            instructerReportList={instructerReportList}
          />
        </TabPanel>
      </Paper>
    </>
  )
}
CustomReport.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  onChangeStudentPage: PropTypes.func,
  pageDetails: PropTypes.object,
  studentGenericFilter: PropTypes.object,
  setStudentFilterValue: PropTypes.func,
  onApplyStudentFilter: PropTypes.func,
  onStudentFilterReset: PropTypes.func,
  successCoachFilter: PropTypes.object,
  setSuccessCoachFilter: PropTypes.func,
  onApplySuccessCoachFilter: PropTypes.func,
  onSuccessCoachFilterReset: PropTypes.func,
  successCoachPageDetails: PropTypes.object,
  onChangeSuccessCoachPage: PropTypes.func,
  instructerFilter: PropTypes.object,
  setInstructerFilter: PropTypes.func,
  onApplyInstructerFilter: PropTypes.func,
  onInstructerFilterReset: PropTypes.func,
  onChangeInstructerPage: PropTypes.func,
  schools: PropTypes.array,
  districts: PropTypes.array,
  fetchSchool: PropTypes.func,
  genericStudentReportList: PropTypes.array,
  successCoachReportList: PropTypes.array,
  instructerReportList: PropTypes.array,
  masterData: PropTypes.object,
  programList: PropTypes.array,
}
CustomReport.defaultProps = {
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  pageDetails: {},
  onChangeStudentPage: () => {},
  studentGenericFilter: {},
  setStudentFilterValue: () => {},
  onApplyStudentFilter: () => {},
  onStudentFilterReset: () => {},
  successCoachFilter: {},
  setSuccessCoachFilter: () => {},
  onApplySuccessCoachFilter: () => {},
  onSuccessCoachFilterReset: () => {},
  successCoachPageDetails: {},
  onChangeSuccessCoachPage: () => {},
  instructerFilter: {},
  setInstructerFilter: () => {},
  onApplyInstructerFilter: () => {},
  onInstructerFilterReset: () => {},
  onChangeInstructerPage: () => {},
  districts: [],
  school: [],
  fetchSchool: () => {},
  genericStudentReportList: [],
  successCoachReportList: [],
  instructerReportList: [],
  masterData: {},
  programList: [],
}

export default CustomReport
