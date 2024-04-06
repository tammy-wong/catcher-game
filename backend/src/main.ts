import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os'

const logger = new Logger('Main')

async function bootstrap() {
  const app = (await NestFactory.create(AppModule, { cors: true }))
    .setGlobalPrefix('api')
  // Let the engine init
  await app.init()
  // Grep settings
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port', 3001)
  const mode = configService.get<string>('mode')
  const sysVer = configService.get<string>('version')  
  logger.log(`System get set ready, version: ${sysVer}, mode: ${mode}`)
  logger.log(`OS: ${os.version()} (${os.platform()}) ${os.release()}`)
  logger.log(`CPU architecture: ${os.arch()}, logical CPU core: ${os.cpus().length}`)
  logger.log(`Total memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB, free memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`)
  // Start listening
  logger.log(`Listening to port: ${port}`)
  await app.listen(port);
}
bootstrap();