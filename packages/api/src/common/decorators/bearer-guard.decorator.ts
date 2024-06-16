/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';

/**
 * BearerGuard is a decorator function that applies ApiBearerAuth and UseGuards decorators to a class method.
 * @param guards An array of CanActivate or Function objects that specify the guards to be used.
 * @returns A decorator function that can be applied to a class method.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const BearerGuard = (...guards: Array<CanActivate | Function>) =>
	function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		ApiBearerAuth()(target, propertyKey, descriptor);
		UseGuards(...guards)(target, propertyKey, descriptor);
	};
