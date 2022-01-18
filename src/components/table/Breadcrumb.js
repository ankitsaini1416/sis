import { Box, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

// import { StyleVariables } from '../../../theme'
const useStyles = makeStyles((theme) => ({
  pageLink: {
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:active': {
      color: '#777777',
    },
  },
}))
export default function BreadcrumbHead(props) {
  const { breadcrumb, urllink } = props
  const classes = useStyles()
  return (
    <Box pb={0}>
      <Breadcrumbs aria-label="breadcrumb" separator={<ArrowForwardIosIcon fontSize="small" />}>
        {breadcrumb.link1 &&
          (urllink.url1 ? (
            <Link to={urllink.url1} className={classes.pageLink}>
              <Typography variant="body1" component="span">
                {breadcrumb.link1}
              </Typography>
            </Link>
          ) : (
            <Typography variant="body1" color="primary">
              {breadcrumb.link1}
            </Typography>
          ))}
        {breadcrumb.link2 &&
          (urllink.url2 ? (
            <Link to={urllink.url2} className={classes.pageLink}>
              <Typography variant="body1" component="span">
                {breadcrumb.link2}
              </Typography>
            </Link>
          ) : (
            <Typography variant="body1" color="textSecondary">
              {breadcrumb.link2}
            </Typography>
          ))}
        {breadcrumb.link3 &&
          (urllink.url3 ? (
            <Link to={urllink.url3} className={classes.pageLink}>
              <Typography variant="body1" component="span">
                {breadcrumb.link3}
              </Typography>
            </Link>
          ) : (
            <Typography variant="body1" color="textSecondary">
              {breadcrumb.link3}
            </Typography>
          ))}
      </Breadcrumbs>
    </Box>
  )
}
BreadcrumbHead.propTypes = {
  breadcrumb: PropTypes.object,
  urllink: PropTypes.object,
}
