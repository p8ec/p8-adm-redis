/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base.service';

@Injectable()
export class AppService extends BaseService {
	/**
	 * Return `pong` to indicate the service is running.
	 */
	ping(): string {
		return 'pong';
	}
}
