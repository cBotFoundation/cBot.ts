import { DependencyManager } from '../../Dependency-manager'
import { IService } from '../../../api/interfaces/IService'

export interface IBootstrapService extends IService {
  init: (dependency: DependencyManager) => void
  dispose: () => Promise<void>
  interval: () => void
}
