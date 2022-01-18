import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { Edit2, Plus, Search, Trash } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { isEmpty } from '../../../../../helpers/utils'
import ConfirmBox from '../../../../common/ConfirmBox'
import CustomTable from '../../../../table/CustomTable'
import useStyles from './../../Organizations.Style'
import AddCategories from './AddCategories'

function ProgramCategories({
  addProgramCategory,
  programsCategory,
  formActionType,
  setFormActionType,
  deleteItems,
  openDeletePopup,
  toggleDeletePopup,
  setSearchValue,
  onSearchEnter,
  getProgramsCategory,
  onResetCategories,
  search,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'categories',
      label: t('categories'),
      isSort: false,
      sortProperty: 'categories',
    },
    {
      id: 'date_created',
      label: t('dateCreated'),
      isSort: false,
      sortProperty: 'date_created',
    },
    {
      id: 'action',
      label: t('actions'),
      isSort: false,
      sortProperty: 'action',
      width: '150px',
    },
  ]

  const classes = useStyles()
  const dataParameter = 'id'
  const [categoryDetail, setCategoryDetail] = React.useState({})

  const onOpen = () => {
    setFormActionType('add')
  }

  const onClose = () => {
    setFormActionType('')
  }

  const onEdit = (event) => {
    setFormActionType('edit')
    let id = event.currentTarget.attributes['data-id'].value
    setCategoryDetail(programsCategory.find((item) => item.pct_id.toString() === id.toString()))
  }

  const ActionButton = (row) => {
    return (
      <>
        <Tooltip title={t('editLms')}>
          <IconButton
            aria-label={t('editLms')}
            edge="start"
            data-id={row.pct_id}
            color="primary"
            onClick={onEdit}
          >
            <Edit2 width="16px" height="16px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <IconButton
            aria-label={t('delete')}
            edge="end"
            data-id={row.pct_id}
            color="secondary"
            onClick={toggleDeletePopup}
          >
            <Trash width="16px" height="16px" />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <Box px={2} py={2} width="100%">
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={10}>
                <TextField
                  className="custom-input-field input-search"
                  variant="outlined"
                  fullWidth
                  size="small"
                  id="search"
                  name="search"
                  autoComplete="search"
                  placeholder={t('fields:searchByCategories')}
                  onChange={setSearchValue}
                  value={search}
                  onKeyDown={onSearchEnter}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Press enter to search"
                          onClick={() => getProgramsCategory()}
                        >
                          <Search className="icon-color-light rotate90" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  className="text-transform-none"
                  disableElevation
                  variant="text"
                  color="primary"
                  onClick={onResetCategories}
                  disabled={isEmpty(search)}
                >
                  {t('reset')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box
              mt={{ xs: 1, sm: 0 }}
              display="flex"
              alignItems="center"
              justifyContent={{
                xs: 'flex-start',
                sm: 'flex-end',
                md: 'flex-end',
              }}
            >
              <Button
                className="text-transform-none"
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                startIcon={<Plus />}
                onClick={onOpen}
              >
                {t('addCategories')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CustomTable
        noDataMessage={t('dataNotFound')}
        data={programsCategory}
        headCells={allHeadCells}
        dataParameter={dataParameter}
        isSelection={false}
      >
        {programsCategory.map((row) => {
          return (
            <TableRow hover data-id={row.id} key={row.id}>
              <TableCell tabIndex={0}>
                <Box display="flex" alignItems="center">
                  <Box
                    mr={1}
                    className="color-box"
                    style={{
                      backgroundColor: row.pct_color_hex ? row.pct_color_hex : '#fff',
                    }}
                  >
                    {' '}
                  </Box>
                  {row.pct_name}
                </Box>
              </TableCell>
              <TableCell tabIndex={0}>{row.createdTimeLabel}</TableCell>
              <TableCell className={classes.verticalSpaceRemove}>{ActionButton(row)}</TableCell>
            </TableRow>
          )
        })}
      </CustomTable>
      {!isEmpty(formActionType) && (
        <AddCategories
          open={!isEmpty(formActionType)}
          onClose={onClose}
          addProgramCategory={addProgramCategory}
          formActionType={formActionType}
          categoryDetail={categoryDetail}
        />
      )}

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

ProgramCategories.propTypes = {
  search: PropTypes.string,
  allHeadCells: PropTypes.array,
  programsCategory: PropTypes.array,
  addProgramCategory: PropTypes.func,
  formActionType: PropTypes.func,
  setFormActionType: PropTypes.func,
  deleteItems: PropTypes.func,
  openDeletePopup: PropTypes.bool,
  toggleDeletePopup: PropTypes.func,
  setSearchValue: PropTypes.func,
  onSearchEnter: PropTypes.func,
  getProgramsCategory: PropTypes.func,
  onResetCategories: PropTypes.func,
}
ProgramCategories.defaultProps = {
  search: '',
  allHeadCells: [],
  CountriesData: [],
  programsCategory: [],
  addProgramCategory: () => {},
  formActionType: () => {},
  setFormActionType: () => {},
  deleteItems: () => {},
  openDeletePopup: false,
  toggleDeletePopup: () => {},
  setSearchValue: () => {},
  onSearchEnter: () => {},
  getProgramsCategory: () => {},
  onResetCategories: () => {},
}

export default ProgramCategories
