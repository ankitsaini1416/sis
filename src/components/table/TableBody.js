import { Box } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

//import noDataImage from '../../assets/images/nodatafound.svg'

export default function (props) {
  const { data, children, headCells, noDataMessage } = props

  if (data.length) {
    return <TableBody>{children}</TableBody>
  } else {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="no-data" colSpan={headCells.length + 1}>
            <Box
              p={5}
              dispaly="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Box mb={3} display="flex" justifyContent="center" className="no-data-image">
                {/*<img width="200px" src={noDataImage} alt="no data" />*/}
              </Box>
              <Box
                component="p"
                fontSize="18px"
                fontWeight="400"
                align="center"
                className="custom-table-no-data"
              >
                {noDataMessage}
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
