import { ApplicationManager } from '../../ApplicationManager'

export default interface Service {
  [x: string]: any
  init: (manager: ApplicationManager) => void
  interval: () => void
  dispose: () => Promise<void>
}
