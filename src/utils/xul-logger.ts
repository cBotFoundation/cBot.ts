import * as log4js from 'log4js'
import { Logger } from '../core/services/interfaces/Logger'

export class XulLogger implements Logger {
  private readonly logger: any

  constructor () {
    log4js.configure({
      appenders: { out: { type: 'stdout' }, cBot: { type: 'file', filename: 'logs/cBot.log' } },
      categories: { default: { appenders: ['cBot', 'out'], level: 'debug' } }
    })

    this.logger = log4js.getLogger('cBot')
  }

  info (message: string): void {
    this.logger.info(message.toUpperCase())
  }

  warn (message: string): void {
    this.logger.warn(message.toUpperCase())
  }

  error (message: string): void {
    this.logger.error(message.toUpperCase())
  }

  fatal (message: string): void {
    this.logger.fatal(message.toUpperCase())
  }
}
