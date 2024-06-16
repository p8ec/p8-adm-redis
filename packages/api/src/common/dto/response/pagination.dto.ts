/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * Pagination DTO
 */
export class PaginationDto {
	@ApiProperty({ description: 'Total count of items' })
	total: number;

	@ApiProperty({ description: 'Total count of pages' })
	pages: number;

	@ApiProperty({ description: 'Current page' })
	page: number;

	@ApiProperty({ description: 'Limit of items per page' })
	limit: number;
}
