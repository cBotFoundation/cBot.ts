import { IService } from '../IService'
import { IChatEngineService } from './IChatEngineService'

export interface IBotAppService extends IService {
  getCurrentChatEngine: () => IChatEngineService
}
