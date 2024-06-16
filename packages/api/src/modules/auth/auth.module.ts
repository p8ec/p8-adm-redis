/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { authConfig, validationSchema } from './config';

@Module({
	imports: [
		PassportModule,
		ConfigModule.forRoot({ validationSchema, isGlobal: true, load: [authConfig] }),
		...(authConfig().enabled
			? [
					JwtModule.registerAsync({
						inject: [ConfigService],
						useFactory: (): JwtModuleOptions => {
							return { secret: authConfig().jwtSecret };
						},
					}),
				]
			: []),
	],
	providers: [JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
