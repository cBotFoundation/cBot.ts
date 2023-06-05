class BootstrapService {

    constructor() {
    }

    async init(dependency) {
        this.logger = dependency.get("Logger");
        this.bank = dependency.get("Bank");
        this.app = dependency.get("BotApp");
        this.client = this.app.getClient();
        // this.members = this.client.guilds.cache.get(process.env.GUILD_ID).members.cache;
        // await this.initUserBalances();
        this.logger.info("Boostraping and seeding bot...");
    }

    async initUserBalances() {
        const userIds = this.members.map(element => {
            logger.warn(`user [${element.user.username}] balance wiped`);
            return element.user.id;
        });
        await this.bank.wipe(userIds, 5000);
    }

    async dispose() {

    }

    async interval() {

    }
}

module.exports = { BootstrapService }