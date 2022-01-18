// eslint-disable-next-line simple-import-sort/imports
import { Box, Button, Grid, Hidden, Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import AceEditor from 'react-ace'
import { ArrowLeft, Copy, Download, Upload } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import { ROUTES } from '../../../../helpers/constants'
import { isEmpty } from '../../../../helpers/utils'
// import withRedirect from '../../../../hocs/RedirectHOC'
import EditTemplateSkeleton from './EditTemplateSkeleton'

// import useStyles from '../Settings.Style'

function EditTemplate({
  updateTemplate,
  templateData,
  copyTemplateText,
  downloadTemplateText,
  getTemplateDetail,
  handleChange,
  readFile,
}) {
  // const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbSettings'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbTemplates'),
      href: ROUTES.TEMPLATE,
    },
    {
      title: t('breadcrumbEditTemplate'),
      href: '',
    },
  ]
  // const ButtonEnhanced = withRedirect(Button)
  if (isEmpty(templateData)) {
    return <EditTemplateSkeleton />
  }
  return (
    <Box mb={2}>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('editTemplate')}
              </Box>
              <Box component="span" className="grey" fontWeight="fontWeightLight">
                ({templateData.nickname})
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
                sm: 'flex-start',
                md: 'flex-end',
                lg: 'flex-end',
              }}
              flexWrap={{ xs: 'wrap', sm: 'wrap', md: 'nowrap' }}
            >
              <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
                <Button
                  onClick={() => {
                    history.goBack()
                  }}
                  className="custom-default-button text-transform-none"
                  size="large"
                  variant="contained"
                  disableElevation
                  startIcon={<ArrowLeft />}
                >
                  {t('back')}
                </Button>
              </Box>
              <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
                <Button
                  className="text-transform-none"
                  size="large"
                  color="primary"
                  onClick={copyTemplateText}
                  startIcon={<Copy />}
                  variant="contained"
                  disableElevation
                >
                  {t('copy')}
                </Button>
              </Box>
              <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
                <Button
                  className="text-transform-none"
                  size="large"
                  onClick={downloadTemplateText}
                  variant="contained"
                  disableElevation
                  startIcon={<Download />}
                  color="primary"
                >
                  {t('download')}
                </Button>
              </Box>
              <Box mr={{ xs: 1, sm: 1, md: 2 }} mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
                <Button
                  className="text-transform-none upload-link-button"
                  startIcon={<Upload />}
                  color="primary"
                  component="span"
                  variant="contained"
                  size="large"
                  disableElevation
                >
                  {t('uploadTemplate')}
                  <input
                    onChange={(e) => readFile(e.target.files[0])}
                    accept=".txt,.js,.html,.css"
                    id="raised-button-file"
                    type="file"
                    className="inputFile"
                    title=""
                  />
                  <input type="hidden" name="file" id="file" value="" />
                </Button>
              </Box>
              <Hidden smDown>
                <Box mb={{ xs: 1, sm: 1, md: 0, lg: 0 }}>
                  <Button
                    className="custom-default-button text-transform-none"
                    size="large"
                    variant="contained"
                    disableElevation
                    onClick={getTemplateDetail}
                  >
                    {t('reset')}
                  </Button>
                </Box>
              </Hidden>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper rounded={true} elevation={1} className="paper-round">
        <Box
          py={1}
          px={2}
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                flexDirection="row"
                tabIndex={0}
              >
                <Typography component="h6" variant="subtitle2">
                  {t('lastUpdatedBy') + ':'}
                </Typography>
                <Box ml={1}>
                  <Typography component="h6" variant="subtitle2">
                    <b>
                      {templateData.modified_by}, {templateData.modified_at}
                    </b>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent={{
                  xs: 'flex-start',
                  sm: 'flex-end',
                  md: 'flex-end',
                  lg: 'flex-end',
                  xl: 'flex-end',
                }}
                flexDirection="row"
                tabIndex={0}
              >
                <Typography component="h6" variant="subtitle2">
                  {t('createdBy') + ':'}
                </Typography>
                <Box ml={1}>
                  <Typography component="h6" variant="subtitle2">
                    <b>
                      {templateData.created_by}, {templateData.created_at}
                    </b>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box width="100%" my={1}>
            <AceEditor
              style={{ width: '100%' }}
              fullWidth
              autoFocus
              mode="html"
              theme="solarized_dark"
              fontSize={16}
              id="root"
              name="root"
              onChange={handleChange}
              value={templateData.content}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{
              xs: 'flex-start',
              sm: 'flex-end',
              md: 'flex-end',
            }}
            pt={{ xs: 3, sm: 4, md: 4 }}
            pb={3}
            width="100%"
          >
            <Hidden mdUp>
              <Button
                className="custom-default-button text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                onClick={getTemplateDetail}
              >
                {t('reset')}
              </Button>
            </Hidden>
            <Box ml={2}>
              <Button
                classes="text-transform-none"
                variant="contained"
                color="primary"
                onClick={updateTemplate}
                disableElevation
                className="text-transform-none"
                size="large"
              >
                {t('Save')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

EditTemplate.propTypes = {
  updateTemplate: PropTypes.func,
  copyTemplateText: PropTypes.func,
  downloadTemplateText: PropTypes.func,
  getTemplateDetail: PropTypes.func,
  readFile: PropTypes.func,
  handleChange: PropTypes.object,
  templateData: PropTypes.object,
}
EditTemplate.defaultProps = {
  updateTemplate: () => {},
  copyTemplateText: () => {},
  downloadTemplateText: () => {},
  getTemplateDetail: () => {},
  readFile: () => {},
  handleChange: () => {},
  templateData: {},
}
export default EditTemplate
