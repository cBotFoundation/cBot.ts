
//Core systems services
const { ControllerService } = require('./implementations/controller.service');
const { DataBaseService } = require('./implementations/database.service');
const { LoggerService } = require('./implementations/logger.service');
const { RestService } = require('./implementations/rest.service');
const { CommandDeployer } = require("./implementations/command-deployer");
const { DiscordService } = require("./implementations/discord.service");
const { BotAppService } = require("./implementations/bot-app.service");
const { BootstrapService } = require("./implementations/bootstrap.service.service");

//User level abstraction services
const { BankService } = require("/implementations/currency/bank.service");
const { BlackJackService } = require("./implementations/games/black-jack.service");
const { VerificationService } = require("./implementations/verification.service");
const { TicketService } = require("./implementations/tickets.service");

module.exports = [
    //Core systems first
    DataBaseService,
    LoggerService,
    RestService,
    ControllerService,
    //User level abstractions last
    DiscordService,
    CommandDeployer,
    BotAppService,
    BankService,
    BlackJackService,
    TicketService,
    VerificationService,
    BootstrapService
]


