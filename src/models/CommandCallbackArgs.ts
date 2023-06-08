import { CacheType, Interaction } from "discord.js";
import { DependencyManager } from "../core/Dependency-manager";

export interface CommandCallbackArgs {
  interaction: Interaction,// Discord only
  dependency: DependencyManager | undefined
}
