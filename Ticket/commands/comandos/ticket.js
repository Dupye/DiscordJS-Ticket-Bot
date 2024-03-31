const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'ticket',
  aliases: [''],

  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('❌ | Você não possui a permissão para esse comando.');

    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete().catch(e => {});
      message.channel.send({ embeds: [embed] }).then(m => {
        setTimeout(() => {
          m.delete().catch(e => {});
        }, 5000);
      });
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(config.title)
        .setDescription(config.description)
        .setThumbnail(config.thumbnail)
        .setFooter({
          text: config.footer
        });

      let selectmenu = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId('ticket')
          .setPlaceholder('Selecione aqui.')
          .addOptions([
            {
              label: 'Suporte',
              emoji: config.emoji,
              value: 'sup'
            },
            {
              label: 'Tirar Duvida',
              emoji: config.emoji4,
              value: 'question'
            },
            {
              label: 'Problema na compra',
              emoji: config.emoji1,
              value: 'pro'
            },
            {
              label: 'Compra',
              emoji: config.emoji1,
              value: 'com'
            },
            {
              label: 'Avaliação',
              emoji: config.emoji2,
              value: 'ava'
            },
            {
              label: 'Sugestão',
              emoji: config.emoji3,
              value: 'sug'
            }
          ])
      );

      message.delete().catch(e => {});
      message.channel.send({
        embeds: [embed],
        components: [selectmenu]
      });
    }
  }
};
          
