const { readdirSync } = require('fs')
module.exports = client => {
  readdirSync('./events/').forEach(file => {
    let events = readdirSync('./events/').filter(file => file.endsWith('.js'))
    for (let file of events) {
      let pull = require(`../events/${file}`)
      if (pull.name) {
        client.events.set(pull.name, pull)
      } else {
        continue
      }
    }
  })
  let green = '\x1b[32m',
    colorful = (color, string, reset = '\x1b[0m') => color + string + reset
  console.log(colorful(green, '🍃 - Events'))
}
