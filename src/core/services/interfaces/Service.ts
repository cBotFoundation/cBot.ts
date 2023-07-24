import { DependencyManager } from '../../Dependency-manager'

export default interface Service {
  [x: string]: any
  init: (manager: DependencyManager) => void
  interval: () => void
  dispose: () => Promise<void>
}
