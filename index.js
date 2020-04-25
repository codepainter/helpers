module.exports = {
  getEnv,
  convert,
  heapdiff
}

let cache = {}
function getEnv (key, value) {
  if (!(key in process.env)) {
    if (value) return value
    throw new Error(`${key} not found in process.env!`)
  }

  if (cache[key]) return cache[key]

  cache[key] = process.env[key]

  return process.env[key]
}

function convert (byte) {
  const arr = ['Byte', 'KB', 'MB', 'GB', 'TB']
  let idx = 0
  while (byte > 999 && idx < 5) {
    byte = Math.round((byte * 100) / 1000) / 100
    idx++
  }
  let size
  if (idx >= 0 && idx <= arr.length - 1) size = arr[idx]
  if (byte < 0) byte = 0
  return `${byte} ${size}`
}

const bytes = require('bytes')
function heapdiff (byte) {
  return bytes(Math.abs(process.memoryUsage().heapUsed - byte))
}
