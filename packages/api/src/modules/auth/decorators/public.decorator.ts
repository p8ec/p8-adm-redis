/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export const IS_PUBLIC_KEY = Symbol('isPublic');
type TPublicDecoratorConditionFn = (request: Request) => boolean;

/**
 * Decorator to skip jwt access token validation for route or controller.
 *
 * @param {(request: Request) => boolean} conditionFn If condition function is set and result is `true`,
 * then skip auth, authenticate otherwise.
 */
export const Public = (conditionFn?: TPublicDecoratorConditionFn) => SetMetadata(IS_PUBLIC_KEY, conditionFn || true);
