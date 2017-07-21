'use strict'

const mercator = require('projections/mercator')
const _ = require('lodash')

const projection = ([lon, lat]) => {
  let {x, y} = mercator({lon, lat}, {latLimit: 80})
  x = _.clamp(x, -180, 180)
  y = _.clamp(y, -90, 90)

  return [
    +(x * 100).toFixed(3),
    +(y * 100).toFixed(3)
  ]
}

module.exports = projection
