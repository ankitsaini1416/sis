import {
  Box,
  Button,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import React from 'react'
import { ArrowRight, Edit, Eye, Search, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'

import DateRangeFilter from '../../../filters/DateRange'
import SelectFilter from '../../../filters/Select'
import CustomTable from '../../../table/CustomTable'
import useStyles from '../Enrollment.Style'
import AddEditNote from './AddEditNote'
import NoteDetail from './NoteDetail'

function Notes({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  filter,
  onSearchEnter,
  setFilterValue,
  onFilterReset,
  onApplyFilter,
  pageDetails,
  onChangePage,
  studentNoteList,
  getStudentNoteDetailById,
  studentNoteDetail,
  actionType,
  setActionType,
  addEditStudentNote,
  masterData,
}) {
  const classes = useStyles()
  const dataParameter = 'id'
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'sn_note',
      label: t('notesTitle'),
      isSort: true,
      sortProperty: 'sn_note',
    },

    {
      id: 'sn_note_type',
      label: t('notesType'),
      isSort: true,
      sortProperty: 'sn_note_type',
    },
    {
      id: 'created_by',
      label: t('createdBy'),
      isSort: true,
      sortProperty: 'created_by',
    },
    {
      id: 'created_at',
      label: t('createdDate'),
      isSort: true,
      sortProperty: 'created_at',
    },
    {
      id: 'updated_by',
      label: t('lastUpdatedBy'),
      isSort: true,
      sortProperty: 'updated_by',
    },
    {
      id: 'updated_at',
      label: t('lastUpdatedDate'),
      isSort: true,
      sortProperty: 'updated_at',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]

  const [noteDetails, setNoteDetails] = React.useState(false)

  const toggleNoteDetail = (event) => {
    if (!noteDetails) {
      let id = event.currentTarget.attributes['data-id'].value
      getStudentNoteDetailById(id)
    }
    setNoteDetails(!noteDetails)
  }

  const onEdit = (event) => {
    let id = event.currentTarget.attributes['data-id'].value
    getStudentNoteDetailById(id)
    setActionType('edit')
  }

  const onOpen = () => {
    setActionType('add')
  }

  const onClose = () => {
    setActionType('')
  }

  const viewDetail = (row) => {
    return (
      <Box whiteSpace="nowrap">
        <IconButton
          edge="start"
          onClick={toggleNoteDetail}
          data-id={row.id}
          color="primary"
          aria-label={t('viewDetail')}
        >
          <Tooltip title={t('viewDetail')}>
            <Eye width="16px" height="16px" />
          </Tooltip>
        </IconButton>
        <IconButton onClick={onEdit} data-id={row.id} color="primary" aria-label={t('editNote')}>
          <Tooltip title={t('editNote')}>
            <Edit width="16px" height="16px" />
          </Tooltip>
        </IconButton>
        {/* <IconButton onClick={onEdit} edge="end" data-id={row.id} color="primary">
          <Tooltip title={t('copyNote')}>
            <Copy width="16px" height="16px" />
          </Tooltip>
        </IconButton> */}
      </Box>
    )
  }
  const breakpoint = useMediaQuery('(max-width:599px)')

  return (
    <>
      {actionType === '' ? (
        <>
          <Box px={3} py={2} width="100%">
            <Accordion defaultExpanded elevation={0} className="custom-accordion">
              <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <TextField
                    className="custom-input-field input-search"
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="q"
                    name="q"
                    value={filter.q}
                    onKeyDown={onSearchEnter}
                    onChange={setFilterValue}
                    autoComplete="search"
                    placeholder={t('fields:searchNotes')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="press enter to search" onClick={onApplyFilter}>
                            <Search className="icon-color-light rotate90" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Grid
                    container
                    spacing={2}
                    alignItems={breakpoint ? '' : 'center'}
                    direction={breakpoint ? 'column-reverse' : ''}
                  >
                    <Grid item xs={12} sm="auto">
                      <AccordionSummary
                        aria-controls="user-filter-content"
                        id="user-filter-header"
                        className="custom-filter-button"
                        aria-expanded={true}
                        tabIndex={-1}
                      >
                        <Box display="flex" alignItems="center">
                          <Sliders className="rotate90" />
                          <Hidden smUp>
                            <Box
                              ml={1}
                              component="span"
                              fontWeight="fontWeightMedium"
                              fontSize="16px"
                            >
                              {t('filters')}
                            </Box>
                          </Hidden>
                        </Box>
                        <ArrowDropDownIcon className="arrow-black" />
                      </AccordionSummary>
                    </Grid>
                    <Grid item xs="auto">
                      <Button
                        className="text-transform-none"
                        size="large"
                        variant="contained"
                        disableElevation
                        color="primary"
                        onClick={onOpen}
                      >
                        {t('addNote')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <AccordionDetails>
                <Box
                  pt={2}
                  display="flex"
                  width="100%"
                  alignItems="flex-start"
                  flexDirection="column"
                >
                  <Hidden smDown>
                    <Typography
                      component="h4"
                      align="left"
                      variant="h6"
                      color="textPrimary"
                      gutterBottom
                      tabIndex={0}
                    >
                      <Box component="span" fontWeight="fontWeightMedium" fontSize="16px">
                        {t('filters')}
                      </Box>
                    </Typography>
                  </Hidden>

                  <Grid spacing={1} container className="filter-search-section">
                    <Grid item xs={12} sm={4} md="auto">
                      <SelectFilter
                        name="type"
                        filter={filter}
                        setFilterValue={setFilterValue}
                        label={t('fields:notesType') + ':'}
                        labelFallback={t('fields:notesType')}
                        optionId="key"
                        optionName="type"
                        options={masterData.student_notes_type.map((item) => ({
                          type: t(`reference:${item}`),
                          key: `${item}`,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <DateRangeFilter
                        fromDateName="fromDate"
                        toDateName="toDate"
                        filter={filter}
                        setFilterValue={setFilterValue}
                        primaryLabel={t('fields:createdDate') + ':'}
                        fromLabel={t('fields:from') + ':'}
                        fromLabelFallback={t('fields:from')}
                        toLabel={t('fields:to') + ':'}
                        toLabelFallback={t('fields:to')}
                        primaryLabelSize="105px"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md="auto">
                      <Box
                        mt={{ xs: 2, sm: 0, lg: 0 }}
                        display="flex"
                        justifyContent={{
                          xs: 'flex-start',
                          sm: 'flex-end',
                          lg: 'flex-end',
                        }}
                        alignItems="center"
                      >
                        <Box mr={1}>
                          <Button
                            className="custom-default-button text-transform-none"
                            disableElevation
                            endIcon={<ArrowRight />}
                            variant="contained"
                            fullWidth
                            onClick={onApplyFilter}
                          >
                            {t('filter')}
                          </Button>
                        </Box>
                        <Button
                          className="text-transform-none"
                          disableElevation
                          variant="text"
                          fullWidth
                          color="primary"
                          onClick={onFilterReset}
                          disabled={!(filter.q || filter.type || filter.toDate || filter.fromDate)}
                        >
                          {t('reset')}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <CustomTable
            noDataMessage={t('tableNoRecordFoundMessage')}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            data={studentNoteList}
            headCells={allHeadCells}
            dataParameter={dataParameter}
            isSelection={false}
          >
            {studentNoteList.map((row) => {
              return (
                <TableRow hover data-id={row.id} key={row.id}>
                  <TableCell tabIndex={0}>{row.sn_note}</TableCell>
                  <TableCell tabIndex={0}>{row.sn_note_type}</TableCell>
                  <TableCell tabIndex={0}>{row.created_by}</TableCell>
                  <TableCell tabIndex={0}>{row.created_at}</TableCell>
                  <TableCell tabIndex={0}>{row.updated_by}</TableCell>
                  <TableCell tabIndex={0}>{row.updated_at}</TableCell>
                  <TableCell className={classes.verticalSpaceRemove}>{viewDetail(row)}</TableCell>
                </TableRow>
              )
            })}
          </CustomTable>
          {studentNoteList.length > 0 && (
            <Box
              display="flex"
              px={2}
              py={2}
              justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              className="custom-pagination"
            >
              <Pagination
                count={pageDetails.last_page}
                shape="rounded"
                color="primary"
                onChange={onChangePage}
                page={pageDetails.page}
                variant="text"
              />
              <Box mt={{ xs: 1, sm: 0 }}>
                <Typography tabIndex={0} component="p" variant="body2">
                  Showing {studentNoteList.length} rows out of {pageDetails.total}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <AddEditNote
          onClose={onClose}
          addEditStudentNote={addEditStudentNote}
          actionType={actionType}
          setActionType={setActionType}
          details={studentNoteDetail}
          masterData={masterData}
        />
      )}

      <NoteDetail
        open={noteDetails}
        onClose={toggleNoteDetail}
        studentNoteDetail={studentNoteDetail}
      />
    </>
  )
}
Notes.propTypes = {
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  setFilterValue: PropTypes.func,
  filter: PropTypes.object,
  onFilterReset: PropTypes.func,
  onApplyFilter: PropTypes.func,
  pageDetails: PropTypes.object,
  studentNoteList: PropTypes.array,
  getStudentNoteDetailById: PropTypes.func,
  studentNoteDetail: PropTypes.object,
  actionType: PropTypes.func,
  setActionType: PropTypes.func,
  addEditStudentNote: PropTypes.func,
  masterData: PropTypes.object,
  onSearchEnter: PropTypes.func,
}

Notes.defaultProps = {
  order: '',
  orderBy: '',
  setOrder: () => {},
  setOrderBy: () => {},
  setFilterValue: () => {},
  filter: {},
  onFilterReset: () => {},
  onApplyFilter: () => {},
  pageDetails: {},
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  studentNoteList: [],
  getStudentNoteDetailById: () => {},
  studentNoteDetail: {},
  actionType: () => {},
  setActionType: () => {},
  addEditStudentNote: () => {},
  masterData: {},
  onSearchEnter: () => {},
}

export default Notes
