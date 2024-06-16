/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { BaseInstance } from '@common/base.instance';

export enum EServiceStatus {
	OPERATIONAL = 'OPERATIONAL',
	INTERMEDIARY = 'INTERMEDIARY',
	FAILED = 'FAILED',
	NOT_SUPPORTED = 'NOT_SUPPORTED',
}

export class BaseService extends BaseInstance {
	constructor() {
		super();
	}

	getStatus(): EServiceStatus {
		return EServiceStatus.NOT_SUPPORTED;
	}
}
