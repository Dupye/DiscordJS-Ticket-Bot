const Discord = require('discord.js')
const config = require('./config.json')
const fs = require('fs')
const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS',
    'DIRECT_MESSAGE_TYPING'
  ]
})

module.exports = client

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync('./commands/')
;['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})

process.on('unhandledRejection', (reason, p) => {
  console.log(' [ ANTICLASH ] | SCRIPT REJEITADO')
  console.log(reason, p)
})

process.on('uncaughtException', (err, origin) => {
  console.log(' [ ANTICLASH] | CATCH ERROR')
  console.log(err, origin)
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [ ANTICLASH ] | BLOQUEADO')
  console.log(err, origin)
})

process.on('multipleResolves', (type, promise, reason) => {
  console.log(' [ ANTICLASH ] | VÁRIOS ERROS')
  console.log(type, promise, reason)
})

client.login(config.token)
    
