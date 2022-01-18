import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as TooltipChart,
  XAxis,
  YAxis,
} from 'recharts'

import { WIZARD_TYPES } from '../../../helpers/constants'

/**
 * Defines a component Confirm Box
 * @param props
 * @returns {*}
 * @constructor
 */

function Widgets({ widget }) {
  const PieLegendStyle = {
    top: 45,
    left: 100 + '%',
    lineHeight: '24px',
    position: 'static',
    width: 'auto',
  }
  const barLegendStyle = {
    top: 45,
    left: 50 + '%',
    lineHeight: '24px',
    position: 'static',
    width: 'auto',
  }
  const breakpoint = useMediaQuery('(max-width:1450px)')
  switch (widget?.widget_info?.type) {
    case WIZARD_TYPES.PIE:
      return (
        <PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            nameKey="name"
            data={widget.wizardInfo.graphData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {widget.wizardInfo.graphData.map((item) => (
              <Cell key={item.name} fill={item.fill} />
            ))}
          </Pie>
          <Legend
            iconSize={15}
            width={180}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={PieLegendStyle}
          />
          {/*<Tooltip payloadUniqBy={true} />*/}
        </PieChart>
      )
    case WIZARD_TYPES.BAR:
      return (
        <BarChart
          width={300}
          height={250}
          data={widget.wizardInfo.graphData}
          barSize={15}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" scale="point" padding={{ left: 10, top: 10, right: 10 }} />
          <YAxis />
          <TooltipChart />
          <Legend
            verticalAlign={breakpoint ? 'bottom' : 'middle'}
            align={breakpoint ? 'left' : 'right'}
            width="100%"
            height={40}
            wrapperStyle={barLegendStyle}
          />
          {widget.wizardInfo.barCollection.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.dataKey}
              stackId="a"
              fill={bar.fill}
            />
          ))}
        </BarChart>
      )
    default:
      return null
  }
}

Widgets.propTypes = {
  widget: PropTypes.object,
}
Widgets.defaultProps = {
  widget: {},
}

/**
 /**
 * Confirm Box modal component
 */
export default Widgets
