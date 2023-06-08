import { Command } from '../../../models/Command'
import { IService } from '../IService'

// TODO: CREATE ALL ARGUMENTS AS REGISTRABLE LAMDAS
export interface IChatEngineService extends IService {
  useCommands: (commands: Command[]) => void
  login: (token: string) => void
  logout: () => void
  sendMessage: (channelId: string, message: string) => void
}
