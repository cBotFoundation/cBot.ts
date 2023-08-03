import { Command } from '../commands/api/Command'
import { cMessage } from '../messages/messages.module'
import { CoreEventsType } from '../services/models/CoreEvents'
import Service from '../services/interfaces/Service'

// TODO: CREATE ALL ARGUMENTS AS REGISTRABLE LAMDAS
export interface ChatEngineService extends Service {
  deployCommands: (commands: Command[]) => void
  replyMessage: (origin: any, message: cMessage) => void
  sendMessage: (channelId: string, message: cMessage) => void
  isChatEventImplemented: (eventName: CoreEventsType) => boolean
  onChatEvent: (eventName: CoreEventsType, on: (args: any) => void) => void
}
