import { Command } from '../../../models/Command'
import { cMessage } from '../../messages/messages.module'
import { IService } from '../IService'
import { CoreEventsType } from '../models/CoreEvents'

// TODO: CREATE ALL ARGUMENTS AS REGISTRABLE LAMDAS
export interface IChatEngineService extends IService {
  useCommands: (commands: Command[]) => void
  login: (token: string) => void
  logout: () => void
  replyMessage: (origin: any, message: cMessage) => void
  sendMessage: (channelId: string, message: cMessage) => void
  isChatEventImplemented: (eventName: CoreEventsType) => boolean
  onChatEvent: (eventName: CoreEventsType, on: (args:any)=> void) => void
}
