/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import Joi from 'joi';

export interface AuthConfigInterface {
	enabled: boolean;
	jwtSecret?: string;
}

export interface AuthEnvSchemaInterface {
	AUTH_ENABLED: Joi.StringSchema<string>;
	AUTH_JWT_SECRET: Joi.StringSchema<string>;
}
