import { expect } from "chai"
import { DependencyManager } from "../../src/core/Dependency-manager"
import { ILogger } from "../../src/core/services/interfaces/ILogger"
import { DiscordChatEngineService } from "../../src/core/services/DiscordChatEngineService"
import { IService } from '../../src/api/interfaces/IService'

describe('DiscordChatEngineService', function() {
    it('Should be implemented in ServiceManager', function() {
        // Do not use any of this as a guide
        const appInstance = new DependencyManager({
            port: 7070,
            deploy: true,
            clientKey: 'process.env.DISCORD_BOT_TOKEN',
            clientId: 'process.env.DISCORD_CLIENT_ID',
            serverId: 'process.env.DISCORD_GUILD_ID',
            commands: [],
            logger: {} as ILogger
          })
        void appInstance.initialize()
        const discordChatEngine: IService = appInstance.get('DiscordChatEngine')

        expect(discordChatEngine).to.satisfy((engine: IService) => engine instanceof DiscordChatEngineService)
    })
})