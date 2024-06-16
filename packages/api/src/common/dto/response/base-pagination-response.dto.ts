/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { BaseResponseDto } from '@common/dto/response/base-response.dto';
import { PaginationDto } from '@common/dto/response/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BasePaginationDto<T> extends BaseResponseDto<T> {
	constructor(data: T, pagination?: PaginationDto) {
		super(data);
		this.pagination = pagination;
	}

	@ApiPropertyOptional({ description: 'Pagination' })
	pagination?: PaginationDto;
}
