/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * Base DTO
 */
export class BaseResponseDto<T> {
	constructor(data: T) {
		this.data = data;
	}

	@ApiProperty({ description: 'Result data', type: Object })
	data: T;
}
