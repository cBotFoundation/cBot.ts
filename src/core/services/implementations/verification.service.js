const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v8');
const e = require('express');
const { replyEmbed, replyEmbedComponents } = require('./discord-messages-templates/reply.embed');
const { verificationStartedEmbed , verificationStartedEmbedComponents } = require('./discord-messages-templates/verification-started.embed');
const rest = new REST({ version: '8' }).setToken(process.env.BOT_TOKEN);


class VerificationService 
{

    constructor() 
    {

    }

    async init(dependency) 
    {

        this.logger = dependency.get("Logger");
        this.botApp = dependency.get("BotApp");
        
        this.botApp.addButtonHandler('start-verification', this.startVerification.bind(this));
        this.discordClient = this.botApp.getClient();
    }

    async publishVerificationAdvice(interaction)
    {
        interaction.channel.send({ embeds: [replyEmbed({})], components: [replyEmbedComponents] })
    }

    async startVerification(interaction)
    {
        try 
        {
            interaction.member.user.send({ embeds: [verificationStartedEmbed({})], components: [verificationStartedEmbedComponents] });
            //interaction.reply({content:"si dime mas..."});
        } 
        catch (error) 
        {
            this.logger.error("error trying to verify: "+error);
        }
    }

    async endVerification(interaction)
    {

    }

    async sendVerificationAdvice(interaction)
    {

    }

    async dispose() 
    {

    }

    async interval() 
    {

    }
}

module.exports = { VerificationService }