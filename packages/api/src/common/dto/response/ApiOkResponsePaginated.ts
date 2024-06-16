/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BasePaginationDto } from '@common/dto/response/base-pagination-response.dto';

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
	applyDecorators(
		ApiExtraModels(BasePaginationDto, dataDto),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(BasePaginationDto) },
					{
						properties: {
							data: {
								type: 'array',
								items: { $ref: getSchemaPath(dataDto) },
							},
						},
					},
				],
			},
		}),
	);
