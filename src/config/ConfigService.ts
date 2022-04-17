export class ConfigService {
  private configFactory: () => any
  private config: any

  constructor({ configFactory }: { configFactory: () => any }) {
    //assignment
    this.configFactory = configFactory
    // setup
    this.config = this.configFactory()
  }

  public getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key]
    if (value) {
      return value
    }
    if (defaultValue) {
      return defaultValue
    }
    throw new Error(`Environment variable ${key} is not set`)
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
