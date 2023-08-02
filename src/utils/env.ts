import { z } from 'zod'
import 'dotenv/config'

const ENV_VARS = z.object({
  PORT: z.string(),
  RUN_COMMAND_DEPLOYER: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_GUILD_ID: z.string(),
  DISCORD_BOT_TOKEN: z.string()
})

ENV_VARS.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof ENV_VARS> {}
  }
}
