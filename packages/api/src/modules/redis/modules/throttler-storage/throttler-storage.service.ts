/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { Injectable } from '@nestjs/common';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import { RedisService } from '../../redis.service';
import { ThrottlerStorage } from '@nestjs/throttler';
import { BaseService } from '@common/base.service';

@Injectable()
export class ThrottlerStorageService extends BaseService implements ThrottlerStorage {
	scriptSrc: string;
	constructor(private redis: RedisService) {
		super();
		this.scriptSrc = this.getScriptSrc();
	}

	getScriptSrc(): string {
		// Credits to wyattjoh for the fast implementation you see below.
		// https://github.com/wyattjoh/rate-limit-redis/blob/main/src/lib.ts
		return `
      local totalHits = redis.call("INCR", KEYS[1])
      local timeToExpire = redis.call("PTTL", KEYS[1])
      if timeToExpire <= 0
        then
          redis.call("PEXPIRE", KEYS[1], tonumber(ARGV[1]))
          timeToExpire = tonumber(ARGV[1])
        end
      return { totalHits, timeToExpire }
    `
			.replace(/^\s+/gm, '')
			.trim();
	}

	async increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {
		// Use EVAL instead of EVALSHA to support both redis instances and clusters.
		// const results: number[] = (await this.redis.call('EVAL', this.scriptSrc, 1, key, ttl)) as number[];
		const results = await this.redis.client.EVAL(this.scriptSrc, {
			keys: [key],
			arguments: [ttl.toString()],
		});

		if (!Array.isArray(results)) {
			throw new TypeError(`Expected result to be array of values, got ${results}`);
		}

		if (results.length !== 2) {
			throw new Error(`Expected 2 values, got ${results.length}`);
		}

		const [totalHits, timeToExpire] = results;

		return {
			totalHits: Number(totalHits),
			timeToExpire: Math.ceil(Number(timeToExpire) / 1000),
		};
	}
}
