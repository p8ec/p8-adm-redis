/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import Joi from 'joi';
import { AuthEnvSchemaInterface } from './auth.interfaces';

/**
 * Environment variables schema
 */
export const authSchema: AuthEnvSchemaInterface = {
	AUTH_ENABLED: Joi.string().default('true'),
	AUTH_JWT_SECRET: Joi.string().when('AUTH_ENABLED', { is: 'true', then: Joi.required() }),
};

/**
 * Environment variables validation schema
 */
export const validationSchema = Joi.object(authSchema);
