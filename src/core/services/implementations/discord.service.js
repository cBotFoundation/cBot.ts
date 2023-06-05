//npm install @discordjs/builders

const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');

// const string = 'Hello!';

// const boldString = bold(string);
// const italicString = italic(string);
// const strikethroughString = strikethrough(string);
// const underscoreString = underscore(string);
// const spoilerString = spoiler(string);
// const quoteString = quote(string);
// const blockquoteString = blockQuote(string);


// const { hyperlink, hideLinkEmbed } = require('@discordjs/builders');
// const url = 'https://discord.js.org/';

// const link = hyperlink('discord.js', url);
// const hiddenEmbed = hideLinkEmbed(url);

// const { inlineCode, codeBlock } = require('@discordjs/builders');
// const jsString = 'const value = true;';

// const inline = inlineCode(jsString);
// const codeblock = codeBlock(jsString);
// const highlighted = codeBlock('js', jsString);

// const { time } = require('@discordjs/builders');
// const date = new Date();

// const timeString = time(date);
// const relative = time(date, 'R');

//USER MENTIONS
// const id = '123456789012345678';

// const user = userMention(id);
// const nickname = memberNicknameMention(id);
// const channel = channelMention(id);
// const role = roleMention(id);
const fs = require('fs');


class DiscordService {

    constructor() {
    }

    async init(dependency) {
        this.logger = dependency.get("Logger");
        let commandsFolder = "./services/implementations/commands";
        var exists = fs.existsSync(commandsFolder);
        if (!exists) {
            this.logger.fatal("commands folder not found u.u");
            return;
        }
        const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));
        this.commandInfo = [];
        this.commandHandlers = new Map();
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.commandInfo.push(command.data.toJSON());
            this.commandHandlers.set(command.data.name, command);
        }
    }

    //command deploy config 
    getCommandsInfo() {
        return this.commandInfo;
    }

    //commands pair to handle calls... 
    getCommands() {
        return this.commandHandlers;
    }

    async dispose() {

    }

    async interval() {

    }
}

module.exports = { DiscordService }