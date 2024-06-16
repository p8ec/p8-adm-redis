/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Injectable, CanActivate } from '@nestjs/common';

/**
 * Dummy guard that will always return true (allow access).
 */
@Injectable()
export class DummyGuard implements CanActivate {
	canActivate(): boolean {
		return true;
	}
}
