import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React from 'react'
import { Check, Info } from 'react-feather'
import { useTranslation } from 'react-i18next'

const CheckboxWithGreenCheck = withStyles({})(Checkbox)

function Permission({ actions, onReset, setActions, updatePoliciesOnRole }) {
  const { t } = useTranslation()

  const onSubmit = function () {
    updatePoliciesOnRole()
  }

  const reset = function () {
    onReset()
  }

  return (
    <Box className="permission-tab">
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} md={9} lg={8} xl={6}>
          <Alert icon={<Info fontSize="inherit" />} className="info-grey" tabIndex={0}>
            {t('permissionInfo')}
          </Alert>
        </Grid>
        <Grid item xs={12} md="auto">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            mt={{ xs: 2, sm: 2, md: 0 }}
          >
            <Button
              className="text-transform-none custom-default-button"
              size="large"
              variant="contained"
              disableElevation
              onClick={reset}
            >
              {t('reset')}
            </Button>
            <Box ml={2}>
              <Button
                color="Primary"
                size="large"
                variant="contained"
                disableElevation
                className="text-transform-none"
                onClick={onSubmit}
              >
                {t('update')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {actions.map((group) => (
        <Box key={group.group} mt={3} className="permission-list">
          <Typography
            component="h6"
            align="left"
            variant="h6"
            color="primary"
            gutterBottom
            tabIndex={0}
          >
            <Box component="span" fontWeight="600" fontSize="16px" mb={1}>
              {group.group}
            </Box>
          </Typography>
          <Divider />
          <Grid container>
            {group.actions.map((action) => {
              return (
                <>
                  <Grid key={action.action} item xs={12} sm={7} md={7} lg={7}>
                    <Box
                      px={0}
                      py={1}
                      fontWeight={600}
                      height="100%"
                      display="flex"
                      alignItems="center"
                      fontSize="16px"
                      component="span"
                      tabIndex={0}
                    >
                      {action.name}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5} md={5} lg={5}>
                    <Box
                      py={1}
                      display="flex"
                      alignItems="center"
                      justifyContent={{
                        xs: 'flex-start',
                        sm: 'flex-end',
                        lg: 'flex-end',
                      }}
                      flexDirection="row"
                      flexWrap="wrap"
                    >
                      <Box
                        minWidth={{ xs: '120px', sm: 'auto', md: '150px' }}
                        display="flex"
                        justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                        className="custom-checkbox"
                      >
                        <FormControlLabel
                          control={
                            <CheckboxWithGreenCheck
                              checked={action.isSelected}
                              onClick={() => {
                                setActions(
                                  actions.map((item) => {
                                    if (item.group === group.group) {
                                      return {
                                        ...item,
                                        actions: item.actions.map((actionItem) => {
                                          if (actionItem.action === action.action) {
                                            return {
                                              ...actionItem,
                                              isSelected: !actionItem.isSelected,
                                            }
                                          }
                                          return actionItem
                                        }),
                                      }
                                    }
                                    return item
                                  })
                                )
                              }}
                              checkedIcon={<Check />}
                              color="Primary"
                            />
                          }
                          label={t('fields:select')}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </>
              )
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

Permission.propTypes = {
  onReset: PropTypes.func,
  actions: PropTypes.array,
  setActions: PropTypes.func,
  updatePoliciesOnRole: PropTypes.func,
}

Permission.defaultProps = {
  onReset: () => {},
  actions: () => {},
  setActions: () => {},
  updatePoliciesOnRole: () => {},
}

export default Permission
