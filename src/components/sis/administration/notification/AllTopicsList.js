import { Box, IconButton, Radio, TableCell, TableRow, Tooltip } from '@material-ui/core'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
// import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { Edit2, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../../../helpers/constants'
import withRedirect from '../../../../hocs/RedirectHOC'
import ConfirmBox from '../../../common/ConfirmBox'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../../settings/Settings.Style'

function AllTopicList({
  allHeadCells,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  topic,
  deleteItems,
  openDeletePopup,
  toggleDeletePopup,
  makeDefault,
}) {
  const { t } = useTranslation()
  const classes = useStyles()

  const dataParameter = 'id'

  const viewDetail = (row) => {
    const IconButtonEnhanced = withRedirect(IconButton)
    return (
      <>
        <Tooltip title={t('editDetail')}>
          <IconButtonEnhanced
            edge="start"
            data-id={row.id}
            color="primary"
            to={`${ROUTES.CONFIGRATION}/${row.id}`}
            className="link-text"
            aria-label={t('editDetail')}
          >
            <Edit2 width="16px" height="16px" />
          </IconButtonEnhanced>
        </Tooltip>

        <Tooltip title={t('delete')}>
          <IconButton
            color="secondary"
            data-id={row.id}
            onClick={toggleDeletePopup}
            className="link-text"
            aria-label={t('delete')}
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <IconButtonEnhanced
          edge="end"
          data-id={row.id}
          color="primary"
          to={`${ROUTES.TOPICLOGS}/${row.id}`}
          className="link-text"
          aria-label={t('viewTopicLogs')}
        >
          <Tooltip title={t('viewTopicLogs')}>
            <ListAltOutlinedIcon fontSize="small" />
          </Tooltip>
        </IconButtonEnhanced>
      </>
    )
  }
  const makeDefaultButton = (row) => {
    return (
      <Tooltip title={t('makeDefault')}>
        <Radio
          checked={row.is_default === true}
          onClick={makeDefault}
          data-id={row.id}
          color="primary"
          p={0}
        />
      </Tooltip>
    )
  }

  return (
    <>
      <CustomTable
        noDataMessage={t('noTopicFound')}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        data={topic}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {topic.map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>{row.name}</TableCell>
              <TableCell tabIndex={0} className={classes.verticalSpaceRemove}>
                {row.description}
              </TableCell>
              <TableCell tabIndex={0} className={classes.verticalSpaceRemove}>
                {row.is_active ? (
                  <Box whiteSpace="nowrap" m={0} component="span" className="label-green">
                    {t('active')}
                  </Box>
                ) : (
                  <Box whiteSpace="nowrap" m={0} component="span" className="label-red">
                    {t('inActive')}
                  </Box>
                )}
              </TableCell>
              <TableCell tabIndex={0}>{row.last_updated}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>
                {makeDefaultButton(row)}
              </TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      <ConfirmBox
        maxWidth="xs"
        open={openDeletePopup}
        close={toggleDeletePopup}
        onConfirm={deleteItems}
        defaultProps={{ message: 'deleteConfirmation', buttonText: 'delete' }}
      />
    </>
  )
}

AllTopicList.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  allHeadCells: PropTypes.array,
  topic: PropTypes.array,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  deleteItems: PropTypes.func,
  onChangePage: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  makeDefault: PropTypes.func,
}
AllTopicList.defaultProps = {
  topic: [],
  order: '',
  orderBy: '',
  allHeadCells: [],
  setOrder: () => {},
  setOrderBy: () => {},
  deleteItems: () => {},
  onChangePage: () => {},
  toggleDeletePopup: () => {},
  makeDefault: () => {},
  openDeletePopup: false,
}

export default AllTopicList
