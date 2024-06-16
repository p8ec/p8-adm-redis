/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, validationSchema } from './config';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRoot(databaseConfig().typeorm),
		ConfigModule.forRoot({ validationSchema, isGlobal: true, load: [databaseConfig] }),
	],
})
export class DatabaseModule {}
