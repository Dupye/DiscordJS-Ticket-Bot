const Discord = require('discord.js');
const client = require('../index.js');
const discordTranscripts = require('discord-html-transcripts');
const config = require('../config.json');

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    let button = interaction.customId;

    if (button.startsWith('fechar')) {
      let embed = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🔒 | Deletando canal em 10 segundos.`);

      interaction.reply({ embeds: [embed], ephemeral: true });

      let logs = interaction.guild.channels.cache.get(config.logs);

      let channel = interaction.channel;

      let attachment = await discordTranscripts.createTranscript(channel);

      let embed1 = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setTitle(`📝 Transcript | ${config.title}`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addFields({
          name: 'Canal:',
          value: `${channel.name}`
        });
      logs.send({ embeds: [embed1], files: [attachment] });

      setTimeout(() => {
        interaction.channel.delete().catch(e => {});
      }, 10000);
    }
    if (button.startsWith('avaliação')) {
      let embed1 = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🔔 | Escreva sua avaliação!`);

      interaction.reply({ embeds: [embed1] }).then(() => {
        let coletor = interaction.channel.createMessageCollector({
          filter: i => i.author.id == interaction.user.id,
          max: 1
        });

        coletor.on('collect', async avaliação => {
          avaliação.delete().catch(e => {});

          let avaliacao = interaction.guild.channels.cache.get(
            config.avaliacao
          );

          let embed2 = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setTitle(`${config.emoji2} Avaliação | ${config.title}`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields(
              {
                name: '✍️ | Autor:',
                value: `<@${interaction.user.id}>`
              },
              { name: '📙 | Mensagem:', value: `\`\`\`${avaliação}\`\`\`` }
            )
            .setTimestamp()
            .setFooter({
              text: config.footer
            });

          let embed3 = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setDescription(
              `${config.emoji2} | ${interaction.user} Sua avaliação foi enviada com sucesso! Deletando canal em 10 segundos.`
            );

          avaliacao.send({ embeds: [embed2] });
          interaction.editReply({ embeds: [embed3] });
          setTimeout(() => {
            interaction.channel.delete().catch(e => {});
          }, 10000);
        });
      });
    }
    if (button.startsWith('sugestão')) {
      let embed = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🔔 | Escreva sua sugestão!`);

      interaction.reply({ embeds: [embed] }).then(() => {
        let coletor = interaction.channel.createMessageCollector({
          filter: i => i.author.id == interaction.user.id,
          max: 1
        });

        coletor.on('collect', async sugestão => {
          sugestão.delete().catch(e => {});

          let sugestao = interaction.guild.channels.cache.get(config.sugestao);

          let embed1 = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setTitle(`${config.emoji3} Sugestão | ${config.title}`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields(
              {
                name: '✍️ | Autor:',
                value: `<@${interaction.user.id}>`
              },
              { name: '📙 | Mensagem:', value: `\`\`\`${sugestão}\`\`\`` }
            )
            .setTimestamp()
            .setFooter({
              text: config.footer
            });

          let embed2 = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setDescription(
              `${config.emoji3} | ${interaction.user} Sua sugestão foi enviada com sucesso! Deletando canal em 10 segundos.`
            );

          sugestao.send({ embeds: [embed1] });
          interaction.editReply({ embeds: [embed2] });
          setTimeout(() => {
            interaction.channel.delete().catch(e => {});
          }, 10000);
        });
      });
    }
    if (button.startsWith('duvida')) {
      let embed = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🔔 | Escreva sua dúvida!`);

      interaction.reply({ embeds: [embed] }).then(() => {
        let coletor = interaction.channel.createMessageCollector({
          filter: i => i.author.id == interaction.user.id,
          max: 1
        });

        coletor.on('collect', async Duvida => {
          Duvida.delete().catch(e => {});

          let duvida = interaction.guild.channels.cache.get(config.duvida);

          let embed1 = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setTitle(`${config.emoji4} Duvida | ${config.title}`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields(
              {
                name: 'Usuário:',
                value: `<@${interaction.user.id}>`
              },
              { name: 'Mensagem:', value: `${Duvida}` }
            )
            .setTimestamp()
            .setFooter({
              text: config.footer
            });

          let embed2 = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setDescription(
              `${config.emoji4} | ${interaction.user} Sua duvida foi enviada com sucesso! Deletando canal em 10 segundos.`
            );

          duvida.send({ embeds: [embed1] });
          interaction.editReply({ embeds: [embed2] });
          setTimeout(() => {
            interaction.channel.delete().catch(e => {});
          }, 10000);
        });
      });
    }
  }
  let fecharTicket = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId('fechar')
      .setLabel('Fechar')
      .setStyle('DANGER')
      .setEmoji('🔒')
  );

  let avaliaçãoTicket = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId('avaliação')
      .setLabel('Avaliação')
      .setStyle('PRIMARY')
      .setEmoji(config.emoji2)
  );

  let sugestãoTicket = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId('sugestão')
      .setLabel('Sugestão')
      .setStyle('PRIMARY')
      .setEmoji(config.emoji3)
  );

  let DuvidaTicket = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId('duvida')
      .setLabel('Duvida')
      .setStyle('PRIMARY')
      .setEmoji(config.emoji4)
  );
  if (interaction.isSelectMenu() && interaction.customId === 'ticket') {
    let categoria = config.categoria;
    let suporte = config.suporte;
    let cliente = config.cliente;

    switch (interaction.values[0]) {
      case 'sup':
        {
          interaction.message.edit();
          let f = await interaction.guild.channels.cache.find(
            c => c.name === `👥・suporte-${interaction.user.username}`
          );
          if (f)
            return interaction.reply({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.cor)
                  .setDescription('🔔 | Você já tem um ticket aberto!')
              ],
              ephemeral: true
            });
          let canal = await interaction.guild.channels
            .create(`👥・suporte-${interaction.user.username}`, {
              type: 'GUILD_TEXT',
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: suporte,
                  allow: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL']
                }
              ]
            })
            .catch(e => {
              return (
                interaction.reply({
                  embeds: [
                    new Discord.MessageEmbed()
                      .setColor(config.cor)
                      .setDescription('🔔 | Não foi possível criar seu ticket!')
                  ],
                  ephemeral: true
                }) && console.log(e)
              );
            });

          canal.send({
            content: `${interaction.user} <@&${suporte}>`,
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setTitle(`${config.emoji} Suporte | ${config.title}`)
                .setDescription(
                  `Olá, seu ticket foi aberto com sucesso! Agora basta você aguardar que logo um **Suporte** irá lhe atender 😊`
                )
            ],
            components: [fecharTicket]
          });

          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setDescription(`🔔 | Seu ticket foi aberto no ${canal}!`)
            ],
            ephemeral: true
          });
        }
        break;
      case 'pro':
        {
          interaction.message.edit();
          let f = await interaction.guild.channels.cache.find(
            c => c.name === `🛒・problema-${interaction.user.username}`
          );
          if (f)
            return interaction.reply({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.cor)
                  .setDescription('🔔 | Você já tem um ticket aberto!')
              ],
              ephemeral: true
            });
          let canal = await interaction.guild.channels
            .create(`🛒・problema-${interaction.user.username}`, {
              type: 'GUILD_TEXT',
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: suporte,
                  allow: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL']
                }
              ]
            })
            .catch(e => {
              return (
                interaction.reply({
                  embeds: [
                    new Discord.MessageEmbed()
                      .setColor(config.cor)
                      .setDescription('🔔 | Não foi possível criar seu ticket!')
                  ],
                  ephemeral: true
                }) && console.log(e)
              );
            });

          canal.send({
            content: `${interaction.user} <@&${suporte}>`,
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setTitle(`${config.emoji1} Problema | ${config.title}`)
                .setDescription(
                  `Olá, seu ticket foi aberto com sucesso! Agora basta você aguardar que logo um **Suporte** irá lhe atender 😊`
                )
            ],
            components: [fecharTicket]
          });

          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setDescription(`🔔 | Seu ticket foi aberto no ${canal}!`)
            ],
            ephemeral: true
          });
        }
        break;
      case 'ava':
        {
          interaction.message.edit();
          if (!interaction.member.roles.cache.get(cliente))
            return interaction.reply({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor('#00008b')
                  .setDescription('🔔 | Você não e cliente!')
              ],
              ephemeral: true
            });
          let f = await interaction.guild.channels.cache.find(
            c => c.name === `⭐・avaliação-${interaction.user.username}`
          );
          if (f)
            return interaction.reply({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.cor)
                  .setDescription('🔔 | Você já tem um ticket aberto!')
              ],
              ephemeral: true
            });
          let canal = await interaction.guild.channels
            .create(`⭐・avaliação-${interaction.user.username}`, {
              type: 'GUILD_TEXT',
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: suporte,
                  allow: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL']
                }
              ]
            })
            .catch(e => {
              return (
                interaction.reply({
                  embeds: [
                    new Discord.MessageEmbed()
                      .setColor(config.cor)
                      .setDescription('🔔 | Não foi possível criar seu ticket!')
                  ],
                  ephemeral: true
                }) && console.log(e)
              );
            });

          canal.send({
            content: `${interaction.user}`,
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setTitle(`${config.emoji2} Avaliação | ${config.title}`)
                .setDescription(
                  `Olá, seu ticket foi aberto com sucesso! Clique no botão abaixo para avaliar-nos 😊`
                )
                .setFooter({
                  text: '🔔 | Após 1 minuto o ticket ira ser fechado!'
                })
            ],
            components: [avaliaçãoTicket]
          });

          setTimeout(() => {
            canal.delete().catch(e => {});
          }, 60000);

          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setDescription(`🔔 | Seu ticket foi aberto no ${canal}!`)
            ],
            ephemeral: true
          });
        }
        break;
      case 'sug':
        {
          interaction.message.edit();
          let f = await interaction.guild.channels.cache.find(
            c => c.name === `🐦・sugestão-${interaction.user.username}`
          );
          if (f)
            return interaction.reply({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.cor)
                  .setDescription('🔔 | Você já tem um ticket aberto!')
              ],
              ephemeral: true
            });
          let canal = await interaction.guild.channels
            .create(`🐦・sugestão-${interaction.user.username}`, {
              type: 'GUILD_TEXT',
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: suporte,
                  allow: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL']
                }
              ]
            })
            .catch(e => {
              return (
                interaction.reply({
                  embeds: [
                    new Discord.MessageEmbed()
                      .setColor(config.cor)
                      .setDescription('🔔 | Não foi possível criar seu ticket!')
                  ],
                  ephemeral: true
                }) && console.log(e)
              );
            });

          canal.send({
            content: `${interaction.user}`,
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setTitle(`${config.emoji3} Sugestão | ${config.title}`)
                .setDescription(
                  `Olá, seu ticket foi aberto com sucesso! Clique no botão abaixo para dar sua sugestão 😊`
                )
                .setFooter({
                  text: '🔔 | Após 1 minuto o ticket ira ser fechado!'
                })
            ],
            components: [sugestãoTicket]
          });

          setTimeout(() => {
            canal.delete().catch(e => {});
          }, 60000);

          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setDescription(`🔔 | Seu ticket foi aberto no ${canal}!`)
            ],
            ephemeral: true
          });
        }
        break;
      case 'question':
        {
          interaction.message.edit();
          let f = await interaction.guild.channels.cache.find(
            c => c.name === `🐦・sugestão-${interaction.user.username}`
          );
          if (f)
            return interaction.reply({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.cor)
                  .setDescription('🔔 | Você já tem um ticket aberto!')
              ],
              ephemeral: true
            });
          let canal = await interaction.guild.channels
            .create(`❓・dúvida-${interaction.user.username}`, {
              type: 'GUILD_TEXT',
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL']
                }
              ]
            })
            .catch(e => {
              return (
                interaction.reply({
                  embeds: [
                    new Discord.MessageEmbed()
                      .setColor(config.cor)
                      .setDescription('🔔 | Não foi possível criar seu ticket!')
                  ],
                  ephemeral: true
                }) && console.log(e)
              );
            });

          canal.send({
            content: `${interaction.user}`,
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setTitle(`${config.emoji4} Dúvida | ${config.title}`)
                .setDescription(
                  `Olá, seu ticket foi aberto com sucesso! Clique no botão abaixo para deixar sua dúvida 😊`
                )
                .setFooter({
                  text: '🔔 | Após 1 minuto o ticket ira ser fechado!'
                })
            ],
            components: [fecharTicket]
          });

          setTimeout(() => {
            canal.delete().catch(e => {});
          }, 60000);

          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setDescription(`🔔 | Seu ticket foi aberto no ${canal}!`)
            ],
            ephemeral: true
          });
        }
        break;
      case 'com': {
        interaction.message.edit();
        let f = await interaction.guild.channels.cache.find(
          c => c.name === `🛒・compra-${interaction.user.username}`
        );
        if (f)
          return interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(config.cor)
                .setDescription('🔔 | Você já tem um ticket aberto!')
            ],
            ephemeral: true
     
