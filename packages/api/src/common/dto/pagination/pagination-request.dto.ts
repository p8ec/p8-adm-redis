/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationRequestDto {
	@ApiPropertyOptional({ description: 'Page number', example: 1, default: 1 })
	@IsInt()
	@Min(1)
	page: number = 1;

	@ApiPropertyOptional({ description: 'Limit number', example: 10, default: 10 })
	@IsInt()
	@Min(1)
	@Max(100)
	limit: number = 10;
}
