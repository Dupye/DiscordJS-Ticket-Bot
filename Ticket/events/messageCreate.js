const client = require('../index.js')
const config = require('../config.json')

client.on('messageCreate', message => {
  let prefix = config.prefix

  if (message.author.bot) return
  if (message.channel.type == 'dm') return

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return

  if (message.author.bot) return
  if (message.channel.type === 'dm') return

  if (!message.content.startsWith(prefix)) return
  let args = message.content.slice(prefix.length).trim().split(/ +/g)

  let cmd = args.shift().toLowerCase()
  if (cmd.length === 0) return
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd))

  try {
    command.run(client, message, args)
  } catch (err) {}
})
