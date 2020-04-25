module.exports = {
  getEnv
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
