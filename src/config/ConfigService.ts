export class ConfigService {
  private configFactory: () => any
  private config: any

  constructor({ configFactory }: { configFactory: () => any }) {
    //assignment
    this.configFactory = configFactory
    // setup
    this.config = this.configFactory()
  }

  public getConfig<T = any>(key?: string): T {
    if (!key) {
      return this.config
    } else {
      const configItem = this.config[key]
      if (configItem) {
        return configItem
      } else {
        throw new Error(`Config item ${key} is not set`)
      }
    }
  }
}
