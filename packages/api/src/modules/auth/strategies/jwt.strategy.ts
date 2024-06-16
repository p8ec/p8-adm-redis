/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { authConfig } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: (req: Request) => {
				const jwtHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
				return jwtHeader ? jwtHeader : req?.cookies?.jwt;
			},
			ignoreExpiration: false,
			secretOrKey: authConfig().jwtSecret,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub };
	}
}
