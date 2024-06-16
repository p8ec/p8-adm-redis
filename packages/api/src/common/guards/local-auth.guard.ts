/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Local authentication guard (user/password validation).
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
