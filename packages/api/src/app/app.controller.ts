/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponseDto } from '@common/dto/response/base-response.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

const CONTROLLER = 'app';

@ApiTags(CONTROLLER)
@Controller(CONTROLLER)
export class AppController {
	constructor(private readonly service: AppService) {}

	@ApiOperation({ summary: 'Ping the service' })
	@ApiOkResponse({ type: BaseResponseDto<string> })
	@Get('ping')
	ping(): BaseResponseDto<string> {
		return new BaseResponseDto<string>(this.service.ping());
	}
}
