import { IService } from '../../../api/interfaces/IService'
import { IChatEngineService } from './IChatEngineService'

export interface IBotAppService extends IService {
  getCurrentChatEngine: () => IChatEngineService
}
