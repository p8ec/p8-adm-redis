/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import * as dotenv from 'dotenv';
import { scanDirectory, toLocalhost } from 'ferramenta';

// Load environment variables from .env files matching the pattern .env.*.local
const configFiles = scanDirectory(process.cwd(), '.env.*.local');
configFiles.forEach((file) => {
	console.debug(`Loading config ${file}:`, Object.keys(dotenv.config({ path: file })?.parsed || {}).join(', '));
});
dotenv.config();

process.on('uncaughtException', (error) => {
	console.error('\x1b[31m%s\x1b[0m', error.message, error.stack?.split('\n')[1].split('at ')[1]);
	// console.error('Execution stopped');
	// process.exit(9);
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { appConfig as appConfig } from '@app/config';
import { SwaggerModule } from '@nestjs/swagger';
import { appSwagger } from '@app/config';
import * as helmet from 'helmet';
import { AppLogger } from '@app/app.logger';
import { INestApplication } from '@nestjs/common';
import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';

const logger = new AppLogger('Bootstrap');

const appFactory = (module: any) => {
	return NestFactory.create(module, {
		bodyParser: true,
		bufferLogs: true,
		logger:
			process.env['NODE_ENV'] === 'production'
				? ['log', 'warn', 'error']
				: ['log', 'debug', 'verbose', 'warn', 'error'],
	});
};

/**
 * Configures the Nest application with various middleware, global settings, and CORS options.
 *
 * @param {INestApplication<any>} application - The Nest application object.
 * @param {string} prefix - The global prefix for all routes in the application.
 *
 * @returns {void}
 */
const configureApp = (application: INestApplication, prefix: string): void => {
	application.setGlobalPrefix(prefix);
	// application.useGlobalPipes(
	// 	new ValidationPipe({
	// 		transform: true,
	// 	}),
	// );
	application.useGlobalFilters(new GlobalExceptionFilter());
	application.useLogger(new AppLogger());
	application.use(helmet.default());
	application.enableCors({
		origin: true,
		credentials: true,
	});
	// application.enableShutdownHooks();
};

/**
 * Initializes and starts the application and admin modules.
 *
 * @returns {Promise<void>} A promise that resolves when the bootstrap process completes.
 */
async function bootstrap(): Promise<void> {
	const config = appConfig();
	logger.log('Launching in ' + (config.production ? 'production' : 'development') + ' mode');
	const app = await appFactory(AppModule);

	configureApp(app, config.prefix);

	if (appSwagger().swagger.enabled) {
		const document = SwaggerModule.createDocument(app, appSwagger().swagger.options);
		SwaggerModule.setup(appSwagger().swagger.path, app, document);
	}

	await app.listen(config.port);

	logger.log(`App: ${toLocalhost(await app.getUrl())}`);
	logger.log(`App Swagger: ${toLocalhost(await app.getUrl()) + appSwagger().swagger.path}`);
}

bootstrap()
	.then(() => logger.log('Initialized'))
	.catch((error) => logger.error(error));
