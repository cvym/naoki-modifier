const Discord = module.require("discord.js");
const db = require('quick.db')
const cl = new db.table("Color")
const config = require("../config")
const footer = config.app.footer
const emote = require('../emotes.json')
module.exports = {
    name: 'vc',
    usage: 'vc',
    description: `Permet de montre les statistiques du serveur.`,
    async execute(client, message) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const total = message.guild.memberCount
        const online = message.guild.presences.cache.filter((presence) => presence.status !== "offline").size
        const vocal = message.guild.members.cache.filter(m => m.voice.channel).size
        const boost = message.guild.premiumSubscriptionCount || '0'

        const embed = new Discord.MessageEmbed()
            .setTitle(`${emote.utilitaire.vocales}・Stats de ${message.guild.name}`)
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`<:membres:1442554705762058250>・*Membres :* **${total}** \n<:online:1442554674187337930>・*En ligne :* **${online}** \n<<:voice:1442554972678918285>・*En vocal :* **${vocal}**  \n<:boosts:1442554906706710631>・*Boost :* **${boost}** `)
            .setFooter({ text: `` })
            .setTimestamp()
            .setFooter({ text: `Stats ${message.guild.name}` })
        message.channel.send({ embeds: [embed] })
        message.delete();
    }
}
