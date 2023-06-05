const { SlashCommandBuilder } = require('@discordjs/builders');
const { blackJackEmbed, blackJackRow } = require('../discord-messages-templates/black-jack.embed');
const { BlackJackForm } = require('../discord-messages-templates/models/black-jack-form');

const MIN_BET_VALUE = 500;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription('black jack game uwu')
        .addNumberOption(option => option.setName('amount').setDescription('how much u want to trade uwu')),
    async execute(interaction, dependecy) {
        if (interaction.options.data.length <= 0) return await interaction.reply({ content: 'cannot start bj: no amount option provided', ephemeral: true });
        const amountOption = interaction.options.data[0];
        if (amountOption.type !== "NUMBER") return await interaction.reply({ content: 'not an number fool', ephemeral: true });
        if (amountOption.value < MIN_BET_VALUE) return await interaction.reply({ content: `min amount: ${MIN_BET_VALUE} :xexo:`, ephemeral: true });

        //TODO:REFACTOR ABOVE...
        const blackJackService = dependecy.get("BlackJack");
        const bank = dependecy.get("Bank");
        const currentUserId = interaction.user.id;
        const userName = interaction.user.username;
        const handBalance = bank.getWallet(currentUserId).handBalance;
        if (handBalance <= MIN_BET_VALUE) return await interaction.reply({ content: 'u need money, go to work or withdraw from the bank', ephemeral: true });

        //TODO: REFACTOR
        blackJackService.startGame(currentUserId,amountOption.value);
        const initialPlayersDeck = blackJackService.getPlayerDeck(currentUserId);
        const initialDealersDeck = blackJackService.getDealersDeck(currentUserId);
        const initialRemainingCards = blackJackService.getRemainingCards(currentUserId);
        const playerHandValue = blackJackService.getPlayerHandValue(currentUserId);
        const dealerHandValue = blackJackService.getDealerHandValue(currentUserId);
        //check if we have a black jack at the begining 
        const status = blackJackService.isBlackJack(currentUserId);

        const embedForm = new BlackJackForm(
                status,
                userName,
                initialPlayersDeck,
                initialDealersDeck,
                initialRemainingCards,
                playerHandValue,
                dealerHandValue,
                amountOption.value);

        const embed = blackJackEmbed(embedForm);
    
        if (status != 1) {
            await interaction.reply({ embeds: [embed], components: [blackJackRow] });
        } else {
            if (status == 1)
                blackJackService.giveReward(currentUserId,false);
                
            await interaction.reply({ embeds: [embed] });
        }
    }
};
