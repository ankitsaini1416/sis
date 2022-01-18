import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React from 'react'
import { X } from 'react-feather'
import { Download } from 'react-feather'
import { useTranslation } from 'react-i18next'

function NoteDetail({ open, onClose, studentNoteDetail }) {
  const { t } = useTranslation()

  const download = (row) => {
    const element = document.createElement('a')
    element.setAttribute('href', row.snf_file)
    element.setAttribute('download', row.snf_file)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Dialog
      paper
      className="custom-dialog"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle disableTypography id="customized-dialog-title" onClose={onClose}>
        <Box pt={1} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" tabIndex={0}>
            <Box component="span" fontWeight="fontWeightBold">
              {t('noteDetails')}
            </Box>
          </Typography>
          {onClose ? (
            <IconButton tabIndex={-1} aria-label="close" className="close-button" onClick={onClose}>
              <X />
            </IconButton>
          ) : null}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box pb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('notesTitle')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {studentNoteDetail.sn_note}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('notesType')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {studentNoteDetail.sn_note_type}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('noteDescription')}
                </Box>
              </Typography>
              <Typography
                component="h6"
                variant="subtitle2"
                color="textPrimary"
                tabIndex={0}
                className="word-break"
              >
                <Box component="span" fontWeight={400}>
                  <div
                    component="div"
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: studentNoteDetail.sn_description,
                    }}
                  ></div>
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('noteAttachments')}
                </Box>
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {studentNoteDetail.sn_student_note_file?.map((row) => {
                  return (
                    <Typography
                      component="h6"
                      variant="subtitle1"
                      color="textPrimary"
                      key={row.id}
                      tabIndex={0}
                    >
                      <Box fontWeight={400} display="flex" alignItems="center">
                        <Box mr={2} display="inline-block">
                          {row.snf_file_name}
                        </Box>
                        <Box display="flex" className="downloadAlignment">
                          <a
                            className="link-color-text link-underline"
                            onClick={() => download(row)}
                          >
                            <Download width="20px" height="20px" />
                          </a>
                        </Box>
                      </Box>
                    </Typography>
                  )
                })}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('createdBy')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {studentNoteDetail.created_by}, {studentNoteDetail.created_at}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component="h6" variant="body2" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={600}>
                  {t('lastUpdatedBy')}
                </Box>
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary" tabIndex={0}>
                <Box component="span" fontWeight={400}>
                  {studentNoteDetail.updated_by}, {studentNoteDetail.updated_at}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

NoteDetail.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  studentNoteDetail: PropTypes.object,
}

NoteDetail.defaultProps = {
  open: false,
  onClose: () => {},
  studentNoteDetail: {},
}

export default NoteDetail
