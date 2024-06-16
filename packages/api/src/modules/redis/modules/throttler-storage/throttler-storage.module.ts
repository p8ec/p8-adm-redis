/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { RedisModule } from '../../redis.module';
import { ThrottlerStorageService } from './throttler-storage.service';
import { ThrottlerModule, ThrottlerOptions } from '@nestjs/throttler';

export const ThrottlerStorageModuleFactory = (throttlers: ThrottlerOptions[]) =>
	ThrottlerModule.forRootAsync({
		imports: [RedisModule],
		inject: [ThrottlerStorageService],
		useFactory: (storage: ThrottlerStorageService) => ({
			storage,
			throttlers,
		}),
	});
