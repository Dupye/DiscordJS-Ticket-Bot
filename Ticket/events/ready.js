const client = require('../index.js')
const config = require('../config.json')

client.on('ready', () => {
  let green = '\x1b[32m',
    colorful = (color, string, reset = '\x1b[0m') => color + string + reset

  console.log(colorful(green, '🍃 - Bot'))
  let activities = [config.ready],
    i = 0
  client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: 'LISTENING'
  })
})
