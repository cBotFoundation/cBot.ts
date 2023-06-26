import { DependencyManager } from '../../core/Dependency-manager'

interface IService {
  [x: string]: any
  init: (manager: DependencyManager) => void
  interval: () => void
  dispose: () => Promise<void>
}

export { IService }
