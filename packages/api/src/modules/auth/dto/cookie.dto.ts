/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ApiProperty } from '@nestjs/swagger';

export class CookieArgs {
	@ApiProperty({ description: 'JWT' })
	jwt: string;
}
