/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response: Response = ctx.getResponse();
		const request: Request = ctx.getRequest();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
			console.debug(`GlobalExceptionFilter: ${request.method} ${request.url}`, exception);
		}

		response.status(status).json({
			code: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			...(exception as any).response,
		});
	}
}
