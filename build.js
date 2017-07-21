'use strict'

const fs = require('fs')
const path = require('path')
const bbox = require('@turf/bbox')
const svgify = require('geojson-svgify')
const toJSON = require('vdom-as-json/toJson')

const projection = require('./projection')

const write = (filename, data) => {
  filename = path.join(__dirname, filename)
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

fs.readFile('./110m_land.json', function (err, res) {
  if (err) {
    return
  }
  res = JSON.parse(res)

  const box = bbox(res)
  const west = box[0]
  const south = -57
  const east = box[2]
  const north = 77.5

  // const world = simplify(res, .17, true)
  const polylines = svgify(res, {
    projection
  })

  const [left, top] = projection([west, north])
  const [right, bottom] = projection([east, south])
  const width = right - left
  const height = bottom - top

  const data = toJSON(polylines)
  const meta = {left, top, right, bottom, width, height}

  return Promise.all([write('data.json', data), write('meta.json', meta)])
})
