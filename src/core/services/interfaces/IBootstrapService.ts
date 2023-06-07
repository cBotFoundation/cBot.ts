import { IService } from '../IService'

export interface IBootstrapService extends IService {
  init: (dependency: DependencyManager) => void
  dispose: () => void
  interval: () => void
}
