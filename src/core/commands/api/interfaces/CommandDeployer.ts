export default interface CommandDeployer {
  deploy: () => Promise<void>
}
