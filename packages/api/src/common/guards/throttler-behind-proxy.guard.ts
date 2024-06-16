/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

/**
 * Extension to the ThrottlerGuard to take ip from "X-Forwarded-For" header to properly work behind a proxy.
 */
@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
	protected async getTracker(req: Record<string, any>): Promise<string> {
		const xForwardedFor = req.headers['x-forwarded-for'];

		return xForwardedFor ? xForwardedFor : req.ips.length ? req.ips[0] : req.ip;
	}
}
