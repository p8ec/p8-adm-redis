/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { Global, Injectable } from '@nestjs/common';
import { BaseService } from '@common/base.service';
import { createClient } from 'redis';
import { redisConfig } from './config';
import * as process from 'process';

@Global()
@Injectable()
export class RedisService extends BaseService {
	public readonly client: ReturnType<typeof createClient>;
	config = redisConfig();

	constructor() {
		super();

		if (!this.config.enabled) {
			return;
		}

		this.client = createClient({ url: this.config.url, password: this.config.password });
	}

	async onModuleInit() {
		if (!this.config.enabled) {
			this.logger.log('Redis is disabled');
			return;
		}

		this.client
			.connect()
			.then(() => {
				this.logger.log('Redis connected');
				this.client
					.ping()
					.then((res) => {
						this.logger.verbose(`Redis ping check: ${res === 'PONG' ? 'OK' : 'FAIL'}`);
					})
					.catch((err) => {
						this.logger.error(err);
						process.exit(1);
					});
			})
			.catch((err) => {
				this.logger.error(err);
			});
	}

	async onModuleDestroy() {
		if (!this.config.enabled) {
			this.logger.log('Redis is disabled');
			return;
		}

		await this.client.disconnect();
	}
}
