import { Box, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Breadcrumb from '../../../../components/breadcrumbs/Breadcrumbs'
import { ROUTES } from '../../../../helpers/constants'
import EmailList from '../../settings/emails/EmailList'

// import useStyles from '../Settings.Style'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function Email({
  email,
  pageDetails,
  onChangePage,
  filter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  districts,
  schools,
  order,
  orderBy,
  setOrder,
  setOrderBy,
}) {
  //   const classes = useStyles()
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
      title: t('breadcrumbSettings'),
      href: ROUTES.EMAIL,
    },
    {
      title: t('breadcrumbEmails'),
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
                {t('emails')}
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
          <Tab label="Email List" id="emailTab-0" tabIndex={0} />
          {/* <Tab disabled label="Email State" id="emailTab-1" tabIndex={0} /> */}
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction} className="horizontal-tabs-2">
          <EmailList
            email={email}
            pageDetails={pageDetails}
            onChangePage={onChangePage}
            filter={filter}
            setFilterValue={setFilterValue}
            onFilterReset={onFilterReset}
            onApplyFilter={onApplyFilter}
            districts={districts}
            schools={schools}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction} className="horizontal-tabs-3">
          <EmailState email={email} />
        </TabPanel> */}
      </Paper>
    </>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

Email.propTypes = {
  email: PropTypes.array,
  pageDetails: PropTypes.object,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  onChangePage: PropTypes.func,
  filter: PropTypes.object,
  setFilterValue: PropTypes.object,
  onFilterReset: PropTypes.object,
  onApplyFilter: PropTypes.object,
  districts: PropTypes.array,
  schools: PropTypes.array,
}

Email.defaultProps = {
  email: [],
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  onChangePage: () => {},
  pageDetails: {},
  filter: {},
  setFilterValue: () => {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  districts: [],
  schools: [],
}

export default Email
