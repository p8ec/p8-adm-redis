/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, appSwagger, validationSchema } from './config';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { AppController } from './app.controller';
import { ThrottlerStorageModuleFactory } from '../modules/redis/modules/throttler-storage/throttler-storage.module';
import { APP_GUARD } from '@nestjs/core';
import { appThrottler } from '@app/config/app.throttler';
import { ThrottlerBehindProxyGuard } from '@common/guards/throttler-behind-proxy.guard';
import { Optional } from '@app/helpers/optional';
import { KafkaModule, StatusModule } from '@p8ec/nestjs';
import { RedisModule } from '../modules/redis/redis.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';

@Module({
	imports: [
		Optional(appThrottler().throttler.enabled, ThrottlerStorageModuleFactory(appThrottler().throttler.limits)),
		ConfigModule.forRoot({
			validationSchema,
			isGlobal: true,
			load: [appConfig, appSwagger, appThrottler],
		}),
		DatabaseModule,
		StatusModule,
		KafkaModule,
		RedisModule,
		NotificationsModule,
	].filter((f) => !!f),
	providers: [
		AppService,
		Optional(appThrottler().throttler.enabled, {
			provide: APP_GUARD,
			useClass: ThrottlerBehindProxyGuard,
		}),
	].filter((f) => !!f),
	controllers: [AppController],
})
export class AppModule {}
