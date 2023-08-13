import ApplicationContext from '../../application/ApplicationContext'

export default interface Service {
  name: string
  init: (manager: ApplicationContext) => void
  interval: () => void
  dispose: () => Promise<void>
}
