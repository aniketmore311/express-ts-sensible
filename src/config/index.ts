import configFactory from './configFactory'
import { ConfigService } from './ConfigService'

export const configService = new ConfigService({ configFactory })
