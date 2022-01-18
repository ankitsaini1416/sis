import { Box, Button, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ROUTES } from '../../../../helpers/constants'
import Breadcrumb from '../../../breadcrumbs/Breadcrumbs'
import CustomTable from '../../../table/CustomTable'

/**
 * Defines a component topic Logs Detail
 * @returns {*}
 * @constructor
 */

function TopicLogsDetail({ details, originalMessage, event, topicId }) {
  const { t } = useTranslation()
  const history = useHistory()
  const dataParameter = '_id'

  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('status')

  const headCells = [
    {
      id: 'event_type',
      label: t('eventType'),
      isSort: true,
      sortProperty: 'event_type',
    },
    {
      id: 'event_message',
      label: t('eventMessage'),
      isSort: true,
      sortProperty: 'event_message',
    },
  ]
  const breadcrumbData = [
    {
      title: t('breadcrumbSIS'),
      href: ROUTES.DASHBOARDLIST,
    },
    {
      title: t('breadcrumbAdministration'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbNotification'),
      href: ROUTES.NOTIFICATION,
    },
    {
      title: t('breadcrumbTopicLogs'),
      href: ROUTES.TOPICLOGS,
    },
    {
      title: t('breadcrumbTopicLogsDetail'),
      href: '',
    },
  ]
  /**
   * renders JSX of TopicsLogs component
   */
  return (
    <>
      <Box py={2}>
        <Breadcrumb data={breadcrumbData} />
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography component="h4" align="left" variant="h5" color="textPrimary" tabIndex={0}>
              <Box component="span" fontWeight="700">
                {t('topicID')}
              </Box>
              <Box ml={1} component="span" fontWeight="500" fontSize="20px" className="user-name">
                ({topicId})
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end', md: 'space-between' }}
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
        <Box px={3} py={3} width="100%">
          <Box pb={3}>
            <Typography
              component="p"
              align="left"
              variant="body2"
              color="Primary"
              className="bg-color-surface"
              tabIndex={0}
            >
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('topicDetail')}
              </Box>
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('receiver') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {details.receivers ? details.receivers.join(', ') : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('loggedAt') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {details.logged_at}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('parentService') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {details.source}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3} pb={3}>
            <Typography
              component="p"
              align="left"
              variant="body2"
              color="Primary"
              className="bg-color-surface"
              tabIndex={0}
            >
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('originalMessage')}
              </Box>
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('topicUrn') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {originalMessage.topics}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('sender') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {originalMessage.sender?.from}
              </Typography>
            </Grid>
            {originalMessage.receivers?.map((receiver) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={receiver.kind}>
                  <Typography component="h6" variant="body2" key={receiver.kind} tabIndex={0}>
                    <b>{receiver.kind === 'to' ? t('receiverTo') + ':' : t('receiverCc') + ':'}</b>
                  </Typography>
                  <Typography component="p" variant="body2" tabIndex={0}>
                    {receiver.target}
                  </Typography>
                </Grid>
              )
            })}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('contentType') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {originalMessage.metadata?.contentType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('metaSubject') + ':'}</b>
              </Typography>
              <Typography component="p" variant="body2" tabIndex={0}>
                {originalMessage.metadata?.subject}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography component="h6" variant="body2" tabIndex={0}>
                <b> {t('logBody') + ':'}</b>
              </Typography>
              <div
                component="div"
                variant="body2"
                tabIndex={0}
                dangerouslySetInnerHTML={{
                  __html: originalMessage.body,
                }}
              ></div>
            </Grid>
          </Grid>

          <Box mt={3} pb={3}>
            <Typography
              component="p"
              align="left"
              variant="body2"
              color="Primary"
              className="bg-color-surface"
              tabIndex={0}
            >
              <Box component="span" fontWeight="600" fontSize="16px">
                {t('TopicEvents')}
              </Box>
            </Typography>
          </Box>
          <Box style={{ border: '1px solid #eee' }}>
            <CustomTable
              noDataMessage={t('dataNotFound')}
              order={order}
              orderBy={orderBy}
              setOrder={setOrder}
              setOrderBy={setOrderBy}
              data={event || []}
              headCells={headCells}
              dataParameter={dataParameter}
              isSelection={false}
            >
              {(event || []).map((row) => {
                return (
                  <TableRow hover Key={row.id}>
                    <TableCell tabIndex={0}>{row.kind}</TableCell>
                    <TableCell tabIndex={0}>
                      <div
                        component="div"
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: row.message,
                        }}
                      ></div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </CustomTable>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
TopicLogsDetail.propTypes = {
  allHeadCells: PropTypes.array,
  topicId: PropTypes.string,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  pageDetails: PropTypes.object,
  details: PropTypes.object,
  originalMessage: PropTypes.array,
  event: PropTypes.array,
}
TopicLogsDetail.defaultProps = {
  allHeadCells: [],
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  pageDetails: {},
  details: {},
  originalMessage: [],
  event: [],
  topicId: '',
}
export default TopicLogsDetail
