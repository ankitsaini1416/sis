import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../../helpers/constants'
import { isEmpty } from '../../../../../helpers/utils'
import Breadcrumb from '../../../../breadcrumbs/Breadcrumbs'
import CountriesSection from './Countries'
import EditSchoolSkeleton from './EditSchoolSkeleton'
import GeneralInfo from './GeneralInfo'
import GeneralSettings from './GeneralSettings'
import GradeScale from './GradeScale'
import LMSConfiguration from './LMSConfiguration'
import PaymentSettings from './PaymentSettings'
import ProgramCategories from './ProgramCategories'
// import useStyles from '../Organizations.Style'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box px={3} py={2}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function EditSchool({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  defaultCountry,
  defaultPhoneCode,
  countries,
  searchCountry,
  checkStateCountry,
  onCheckCountry,
  setSearchText,
  onCountrySearchEnter,
  editCountries,
  resetCountryState,
  onChangeDefaultCountry,
  onChangePage,
  pageDetails,
  setPageDetails,
  onApplyFilter,
  formState,
  masterData,
  editSchool,
  districts,
  states,
  school,
  searchStates,
  generalSetting,
  addUpdateGeneralSetting,
  editLogo,
  addProgramCategory,
  programsCategory,
  setFormActionType,
  formActionType,
  deleteItems,
  openDeletePopup,
  toggleDeletePopup,
  setSearchValue,
  onSearchEnter,
  search,
  onReset,
  getProgramsCategory,
  onResetCategories,
  appInfo,
  addPaymentAppId,
  updatePaymentAppId,
  paymentMaster,
  addPaymentGateway,
  editPaymentGateway,
  paymentGateways,
  removePaymentGateway,
  lmsList,
  createLmsConfig,
  configLmsList,
  createTopicInitialState,
  formValues,
  removeLmsConfig,
  lmsAction,
  setLmsAction,
  getAuthurl,
  value,
  handleChange,
  tabs,
  fetchCountries,
  paginationMidState,
  addGradeScale,
  gradeScale,
}) {
  const history = useHistory()
  const { t } = useTranslation()
  const theme = useTheme()

  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbOrganizations'),
      href: ROUTES.SCHOOLS,
    },
    {
      title: t('breadcrumbSchool'),
      href: ROUTES.SCHOOLS,
    },
    {
      title: t('breadcrumbEditSchool'),
      href: '',
    },
  ]
  if (isEmpty(school)) {
    return <EditSchoolSkeleton />
  }
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography tabIndex={0} component="h4" align="left" variant="h5" color="textPrimary">
              <Box component="span" fontWeight="700">
                {t('editSchool')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({school.sch_name})
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
          {Object.keys(tabs)
            .filter((tab) => tabs[tab].show)
            .sort((a, b) => {
              return tabs[a].index - tabs[b].index
            })
            .map((tab) => (
              <Tab
                key={tab}
                aria-label={t(tab)}
                value={tabs[tab].index}
                label={t(tab)}
                id={`schoolTab-${tabs[tab].index}`}
              />
            ))}
        </Tabs>
        {tabs.generalInfos.show && (
          <TabPanel value={value} index={0} dir={theme.direction}>
            <GeneralInfo
              formState={formState}
              masterData={masterData}
              editSchool={editSchool}
              districts={districts}
              states={states}
              school={school}
              searchStates={searchStates}
              editLogo={editLogo}
            />
          </TabPanel>
        )}
        {tabs.paymentSettings.show && (
          <TabPanel value={value} index={1} dir={theme.direction} className="horizontal-tabs-2">
            <PaymentSettings
              appInfo={appInfo}
              addPaymentAppId={addPaymentAppId}
              updatePaymentAppId={updatePaymentAppId}
              paymentMaster={paymentMaster}
              paymentGateways={paymentGateways}
              addPaymentGateway={addPaymentGateway}
              editPaymentGateway={editPaymentGateway}
              removePaymentGateway={removePaymentGateway}
            />
          </TabPanel>
        )}
        {tabs.generalSetting.show && (
          <TabPanel value={value} index={2} dir={theme.direction}>
            <GeneralSettings
              generalSetting={generalSetting}
              addUpdateGeneralSetting={addUpdateGeneralSetting}
            />
          </TabPanel>
        )}
        {tabs.countries.show && (
          <TabPanel value={value} index={3} dir={theme.direction} className="horizontal-tabs-2">
            <CountriesSection
              order={order}
              orderBy={orderBy}
              setOrder={setOrder}
              setOrderBy={setOrderBy}
              defaultCountry={defaultCountry}
              defaultPhoneCode={defaultPhoneCode}
              countries={countries}
              searchCountry={searchCountry}
              checkStateCountry={checkStateCountry}
              onCheckCountry={onCheckCountry}
              setSearchText={setSearchText}
              onCountrySearchEnter={onCountrySearchEnter}
              editCountries={editCountries}
              resetCountryState={resetCountryState}
              onChangeDefaultCountry={onChangeDefaultCountry}
              onChangePage={onChangePage}
              pageDetails={pageDetails}
              setPageDetails={setPageDetails}
              onApplyFilter={onApplyFilter}
              onReset={onReset}
              fetchCountries={fetchCountries}
              paginationMidState={paginationMidState}
            />
          </TabPanel>
        )}
        {tabs.lmsConfiguration.show && (
          <TabPanel value={value} index={4} dir={theme.direction} className="horizontal-tabs-2">
            <LMSConfiguration
              lmsList={lmsList}
              lmsAction={lmsAction}
              setLmsAction={setLmsAction}
              createLmsConfig={createLmsConfig}
              configLmsList={configLmsList}
              createTopicInitialState={createTopicInitialState}
              formValues={formValues}
              removeLmsConfig={removeLmsConfig}
              getAuthurl={getAuthurl}
            />
          </TabPanel>
        )}
        {tabs.programCategories.show && (
          <TabPanel value={value} index={5} dir={theme.direction} className="horizontal-tabs-2">
            <ProgramCategories
              addProgramCategory={addProgramCategory}
              programsCategory={programsCategory}
              formActionType={formActionType}
              setFormActionType={setFormActionType}
              deleteItems={deleteItems}
              openDeletePopup={openDeletePopup}
              toggleDeletePopup={toggleDeletePopup}
              setSearchValue={setSearchValue}
              onSearchEnter={onSearchEnter}
              search={search}
              getProgramsCategory={getProgramsCategory}
              onResetCategories={onResetCategories}
            />
          </TabPanel>
        )}
        {tabs.gradeScale.show && (
          <TabPanel value={value} index={6} dir={theme.direction}>
            <GradeScale addGradeScale={addGradeScale} gradeScale={gradeScale} />
          </TabPanel>
        )}
      </Paper>
    </>
  )
}

EditSchool.propTypes = {
  masterData: PropTypes.object,
  editSchool: PropTypes.func,
  school: PropTypes.object,
  formState: PropTypes.object,
  districts: PropTypes.array,
  states: PropTypes.array,
  searchStates: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  defaultCountry: PropTypes.array,
  defaultPhoneCode: PropTypes.array,
  countries: PropTypes.array,
  searchCountry: PropTypes.String,
  checkStateCountry: PropTypes.object,
  onCheckCountry: PropTypes.func,
  setSearchText: PropTypes.func,
  onCountrySearchEnter: PropTypes.func,
  editCountries: PropTypes.func,
  resetCountryState: PropTypes.func,
  onChangeDefaultCountry: PropTypes.func,
  pageDetailsState: PropTypes.any,
  onChangePage: PropTypes.func,
  pageDetails: PropTypes.any,
  setPageDetails: PropTypes.any,
  onApplyFilter: PropTypes.func,
  generalSetting: PropTypes.func,
  addUpdateGeneralSetting: PropTypes.func,
  editLogo: PropTypes.func,
  addProgramCategory: PropTypes.func,
  programsCategory: PropTypes.array,
  formActionType: PropTypes.func,
  setFormActionType: PropTypes.func,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  setSearchValue: PropTypes.func,
  onSearchEnter: PropTypes.func,
  search: PropTypes.string,
  onReset: PropTypes.func,
  getProgramsCategory: PropTypes.func,
  onResetCategories: PropTypes.func,
  appInfo: PropTypes.object,
  addPaymentAppId: PropTypes.func,
  updatePaymentAppId: PropTypes.func,
  addPaymentGateway: PropTypes.func,
  editPaymentGateway: PropTypes.func,
  removePaymentGateway: PropTypes.func,
  paymentMaster: PropTypes.array,
  paymentGateways: PropTypes.array,
  lmsList: PropTypes.array,
  createLmsConfig: PropTypes.func,
  configLmsList: PropTypes.array,
  createTopicInitialState: PropTypes.object,
  formValues: PropTypes.object,
  removeLmsConfig: PropTypes.func,
  lmsAction: PropTypes.object,
  setLmsAction: PropTypes.func,
  getAuthurl: PropTypes.func,
  value: PropTypes.func,
  handleChange: PropTypes.func,
  tabs: PropTypes.object,
  fetchCountries: PropTypes.func,
  paginationMidState: PropTypes.func,
  addGradeScale: PropTypes.func,
  gradeScale: PropTypes.func,
}

EditSchool.defaultProps = {
  masterData: {},
  editSchool: () => {},
  school: {},
  formState: {},
  districts: [],
  states: [],
  searchStates: () => {},
  order: '',
  orderBy: '',
  defaultCountry: [],
  defaultPhoneCode: [],
  countries: [],
  searchCountry: '',
  checkStateCountry: {},
  onCheckCountry: () => {},
  setSearchText: () => {},
  onCountrySearchEnter: () => {},
  editCountries: () => {},
  resetCountryState: () => {},
  onChangeDefaultCountry: () => {},
  onChangePage: () => {},
  onApplyFilter: () => {},
  generalSetting: () => {},
  addUpdateGeneralSetting: () => {},
  editLogo: () => {},
  addProgramCategory: () => {},
  programsCategory: [],
  formActionType: () => {},
  setFormActionType: () => {},
  deleteItems: () => {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  setSearchValue: () => {},
  onSearchEnter: () => {},
  search: '',
  onReset: () => {},
  getProgramsCategory: () => {},
  onResetCategories: () => {},
  appInfo: {},
  addPaymentAppId: () => {},
  updatePaymentAppId: () => {},
  addPaymentGateway: () => {},
  editPaymentGateway: () => {},
  removePaymentGateway: () => {},
  paymentMaster: [],
  paymentGateways: [],
  lmsList: [],
  createLmsConfig: () => {},
  configLmsList: [],
  createTopicInitialState: {},
  formValues: {},
  removeLmsConfig: {},
  lmsAction: {},
  setLmsAction: () => {},
  getAuthurl: () => {},
  value: () => {},
  handleChange: () => {},
  tabs: {},
  fetchCountries: () => {},
  paginationMidState: () => {},
  addGradeScale: () => {},
  gradeScale: () => {},
}
export default EditSchool
