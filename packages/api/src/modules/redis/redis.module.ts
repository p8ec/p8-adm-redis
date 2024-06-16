/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisConfig, validationSchema } from './config';
import { RedisService } from './redis.service';
import { ThrottlerStorageService } from './modules/throttler-storage/throttler-storage.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema,
			isGlobal: true,
			load: [redisConfig],
		}),
	],
	providers: [RedisService, ThrottlerStorageService],
	exports: [RedisService, ThrottlerStorageService],
})
export class RedisModule {}
