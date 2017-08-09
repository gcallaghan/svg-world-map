'use strict'

const miller = require('projections/miller')
const _ = require('lodash')

const projection = ([lon, lat]) => {
  let {x, y} = miller({lon, lat})
  x = _.clamp(x, -180, 180)
  y = _.clamp(y, -90, 90)

  return [
    +(x * 100).toFixed(3),
    +(y * 100).toFixed(3)
  ]
}

module.exports = projection
