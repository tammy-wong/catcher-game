import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { RouteMiddleware } from './middlewares/route.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/TyprOrmConfigService';
import { RouteInterceptor } from './interceptors/route.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { CatcherGameModule } from './catchergame/catchergame.module';
import { AppGateway } from './app.gateway';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';

// Define multiple env file, FIFO
const ENV_FILE_PATH: string[] = ['.env']
// Config module, reading .env file
const CONFIG_MODEL = ConfigModule.forRoot({
  envFilePath: ENV_FILE_PATH,
  cache: true,
  isGlobal: true,
  load: [configuration]
})
// Database module
const TYPE_ORM_MODULE = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
})
// Interceptor
const ROUTE_INTERCEPTOR = {
  provide: APP_INTERCEPTOR,
  useClass: RouteInterceptor,
}
// Filter
const HTTP_EXCEPTION_FILTER = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter
}

// Module settings
@Module({
  imports: [CONFIG_MODEL, TYPE_ORM_MODULE, CatcherGameModule, SocketModule],
  controllers: [AppController],
  providers: [AppService, ROUTE_INTERCEPTOR, HTTP_EXCEPTION_FILTER, AppGateway, SocketService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Config middlewares
    consumer
      .apply(RouteMiddleware)
      .forRoutes('*')
  }
}
