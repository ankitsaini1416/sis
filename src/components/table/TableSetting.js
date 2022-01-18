/* eslint-disable no-unused-vars */
import { Box, Button, IconButton, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Check, X } from 'react-feather'
import { useTranslation } from 'react-i18next'

import useStyles from './TableSetting.Style'

/**
 * Defines a component Table Setting
 * @param props
 * @returns {*}
 * @constructor
 */

function TableColumnSetting({ open, onClose, allHeadCells, initialHeadcells, setHeadcells }) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [headcells, setHeadCells] = useState(initialHeadcells || [])
  const [selectAll, setSelectAll] = useState(true)

  const onChangeCell = function (event) {
    const id = event.currentTarget.id
    if (headcells.includes(id)) {
      setHeadCells(headcells.filter((cell) => cell !== id))
      setSelectAll(!(headcells.filter((cell) => cell !== id).length < allHeadCells.length))
    } else {
      setHeadCells((lastState) => {
        return [...lastState, id]
      })
      setSelectAll([...headcells, id].length === allHeadCells.length)
    }
  }
  const onSettingClose = function () {
    setHeadCells(initialHeadcells)
    if (initialHeadcells.length === allHeadCells.length) {
      setSelectAll(true)
    }
    onClose()
  }

  const onSelectAll = function (event) {
    if (selectAll) {
      setHeadCells(
        allHeadCells
          .filter(
            (headCell, i) => i <= 1 || i === allHeadCells.length - 1 || headCell.settingDisabled
          )
          .map((cell) => cell.id)
      )
      setSelectAll(false)
    } else {
      setHeadCells(allHeadCells.map((cell) => cell.id))
      setSelectAll(true)
    }
  }
  const onSubmit = function (event) {
    setHeadcells(headcells)
    onClose()
  }
  useEffect(() => {
    if (initialHeadcells.length < allHeadCells.length) {
      setSelectAll(false)
    }
  }, [])
  const CheckboxWithGreenCheck = withStyles({})(Checkbox)
  /**
   * Render JSX of Student Setting modal
   */
  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onSettingClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle disableTypography id="customized-dialog-title" onClose={onSettingClose}>
        <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography tabIndex={0} variant="h5">
              <Box component="span" fontWeight="fontWeightBold">
                {t('tableSetting')}
              </Box>
            </Typography>
            <Typography tabIndex={0} component="h6" variant="subtitle2">
              {t('tableSettingInfo')}
            </Typography>
          </Box>
          <IconButton
            tabIndex={1}
            aria-label="close"
            className="close-button"
            onClick={onSettingClose}
          >
            <X />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" className="custom-checkbox">
          <FormControl component="fieldset">
            <FormControlLabel
              className={classes.checkboxHead}
              value="end"
              control={
                <CheckboxWithGreenCheck
                  inputProps={{ 'aria-label': t('selectAllColumns') }}
                  color="primary"
                  checked={selectAll}
                  id="selectAll"
                  onChange={onSelectAll}
                  checkedIcon={<Check />}
                />
              }
              label={t('selectAll')}
              labelPlacement="end"
            />
          </FormControl>
          <FormControl component="div" className={classes.columnSettings}>
            {allHeadCells.map((headCell, i) => (
              <FormControlLabel
                key={headCell.id}
                value="end"
                control={
                  <CheckboxWithGreenCheck
                    inputProps={{ 'aria-label': headCell.label }}
                    color="primary"
                    checked={headcells.includes(headCell.id)}
                    disabled={i <= 1 || i === allHeadCells.length - 1 || headCell.settingDisabled}
                    onChange={onChangeCell}
                    id={headCell.id}
                    checkedIcon={<Check />}
                  />
                }
                label={headCell.label}
                labelPlacement="end"
              />
            ))}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className="custom-default-button text-transform-none"
          onClick={onSettingClose}
          size="large"
          variant="contained"
          disableElevation
        >
          {t('cancel')}
        </Button>
        <Button
          className="text-transform-none"
          color="primary"
          variant="contained"
          size="large"
          disableElevation
          onClick={onSubmit}
        >
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TableColumnSetting.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  initialHeadcells: PropTypes.array,
  allHeadCells: PropTypes.array,
  setHeadcells: PropTypes.func,
}
TableColumnSetting.defaultProps = {
  open: false,
  onClose: () => {},
  initialHeadcells: [],
  allHeadCells: [],
  setHeadcells: () => {},
}

export default TableColumnSetting
