export default interface ICommandDeployer {
  deploy: () => Promise<void>
}
