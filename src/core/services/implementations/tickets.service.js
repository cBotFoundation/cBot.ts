const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v8');
const { replyEmbed, replyEmbedComponents } = require('./discord-messages-templates/reply.embed');
const { verificationStartedEmbed , verificationStartedEmbedComponents } = require('./discord-messages-templates/verification-started.embed');
const rest = new REST({ version: '8' }).setToken(process.env.BOT_TOKEN);

class TicketService 
{
    constructor() 
    {
        this.idOffset = 42069660;

        this.ticketModeratorsIds = Array.from(
            [
                224688978668814347, //xul
                133076673150189568  //vaca
            ]
        );

        this.ticketChannelId = 1054804554463580240;
        this.currentId = this.idOffset;

        this.coldDownStatusMap = new Map();
        this.openTickets = new Map();
    }

    async init(dependency) 
    {

        this.logger = dependency.get("Logger");
        this.botApp = dependency.get("BotApp");
        this.discordClient = this.botApp.getClient();
        
        //this.botApp.addButtonHandler('start-verification', this.startVerification.bind(this));
    }

    async createTicket(interaction)
    {

        return await interaction.reply({ content: `Ticket created ID: (please wait...)`, ephemeral: true });
    }

    async hasTicketColdDown(userId)
    {
        const coldDownDate = this.coldDownStatusMap.get(userId);
        const now = new Date(Date.now());
        const coldDownTime = new Date(Date.now() + 900000); //+ 15 min

        if (coldDownDate == null || now < coldDownDate )
        {
            this.coldDownStatusMap.set(userId, coldDownTime);
            return false;
        }
        else
        {
            return true;
        }
    }

    async dispose() 
    {

    }

    async interval() 
    {

    }
}

module.exports = { TicketService }