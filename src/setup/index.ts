import configFactory from '../config/configFactory'
import { ConfigService } from '../config/ConfigService'

export const configService = new ConfigService({ configFactory })
