'use strict'

const svg = require('virtual-dom/virtual-hyperscript/svg')

const meta = require('./meta.json')
const map = require('./map')
const projection = require('./projection')

const pinRatio = 5 / 8
const pin = svg('symbol',
  {
    id: 'mappin',
    viewBox: '0 0 5 8'
  }, [
    svg('ellipse', {
      rx: '.5',
      ry: '.3',
      cy: '7.7',
      cx: '2.5',
      fill: '#555'
    }),
    svg('path', {
      d: 'M2.5 7.7 L 4.665 3.75 A 2.5 2.5 0 1 0 0.335 3.75 L 2.5 7.7',
      fill: 'red'
    }),
    svg('circle', {r: '.9', cy: '2.5', cx: '2.5', fill: 'black'})])

const defaults = {
  ocean: '#476F9C',
  land: 'white',
  mapWidth: 500,
  pin: pin,
  pinHeight: 8
}

const render = function (lon, lat, opt) {
  opt = opt || {}
  opt = Object.assign({}, defaults, opt)

  const mapWidth = opt.mapWidth
  const mapHeight = mapWidth * meta.height / meta.width

  const pinHeight = opt.pinHeight
  const pinWidth = pinRatio * pinHeight
  let [pinX, pinY] = projection([lon, lat])
  pinY -= pinHeight
  pinX -= pinWidth / 2

  return svg('svg', {
    width: mapWidth + '',
    height: mapHeight + '',
    viewBox: [meta.left, meta.top, meta.width, meta.height].join(', ')
  }, [
    map,
    svg('defs', {}, [opt.pin]),
    svg('use', {
      'xlink:href': '#mappin',
      href: '#mappin',
      x: pinX + '',
      y: pinY + '',
      width: pinWidth + '',
      height: pinHeight + ''
    })
  ])
}

module.exports = render
