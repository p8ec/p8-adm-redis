/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { appConfig } from './app.config';
import { AppEnvSchemaInterface } from '@app/config/app.interface';
import { OptionalModuleConfigInterface } from '@app/interfaces/optional-module-config.interface';
import { appDefaults } from '@app/config/app.defaults';
import { AsStringType } from '@p8ec/nestjs';
import * as fs from 'node:fs';

export type TSwaggerConfigOptions = Omit<OpenAPIObject, 'paths'>;

export interface ISwaggerConfigOptions extends OptionalModuleConfigInterface {
	options: TSwaggerConfigOptions;
	path: string;
}

interface ISwaggerConfig {
	swagger: ISwaggerConfigOptions;
}

export const appSwagger = (): ISwaggerConfig => {
	const env = process.env as AsStringType<AppEnvSchemaInterface>;

	const swaggerPathWithSlash = (env.APP_SWAGGER_PATH?.charAt(0) !== '/' ? '/' : '') + env.APP_SWAGGER_PATH;

	const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

	return {
		swagger: {
			enabled: (env.APP_SWAGGER_ENABLED ?? appDefaults.APP_SWAGGER_ENABLED) === 'true',
			options: new DocumentBuilder()
				.setTitle(appConfig().name + ' API')
				.setDescription((packageJson.description ?? appConfig().name) + ' API Specification')
				.setVersion('1.0')
				.addBearerAuth()
				.setExternalDoc('OpenAPI JSON', `${swaggerPathWithSlash}-json`)
				.build(),
			path: swaggerPathWithSlash,
		},
	};
};
