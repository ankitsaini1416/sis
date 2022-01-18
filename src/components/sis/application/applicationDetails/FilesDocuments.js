import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import FilesDocumentsList from './FilesDocumentsList'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box py={2}>{children}</Box>}
    </div>
  )
}
function FilesDocuments() {
  const theme = useTheme()
  const { t } = useTranslation()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Box px={{ xs: 2, md: 0 }} pt={{ xs: 2, md: 0 }}>
        <Typography tabIndex={0} component="p" variant="body2" color="textPrimary" gutterBottom>
          <Box fontWeight="600" fontSize="16px">
            {t('filesDocuments')}
          </Box>
        </Typography>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="tabs"
        variant="scrollable"
        className="custom-tabs"
      >
        <Tab label={t('student')} id="ApplicationDetailsTab-0" />
        <Tab label={t('parents')} id="ApplicationDetailsTab-1" />
      </Tabs>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <FilesDocumentsList />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <FilesDocumentsList />
      </TabPanel>
    </>
  )
}

FilesDocuments.propTypes = {
  allHeadCells: PropTypes.array,
  allHeadCells2: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  FilesDocumentsData: PropTypes.array,
  StatesData: PropTypes.array,
  pageDetails: PropTypes.object,
}
FilesDocuments.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  FilesDocumentsData: [],
  pageDetails: {},
}

export default FilesDocuments

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
