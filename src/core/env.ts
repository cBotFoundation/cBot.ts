import { z } from  'zod'
import "dotenv/config"

const env_vars = z.object({
    PORT: z.string(),
    RUN_COMMAND_DEPLOYER: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_GUILD_ID: z.string(),
    DISCORD_BOT_TOKEN: z.string()
})

env_vars.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof env_vars> {} 
    }
}