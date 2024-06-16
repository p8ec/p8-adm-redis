/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ConsoleLogger } from '@nestjs/common';
import { appConfig } from './config';

/**
 * Custom logger for the application
 * Adds the application name to the log output
 */
export class AppLogger extends ConsoleLogger {
	private code = appConfig().code;

	public setAppName(name: string): void {
		this.code = name;
	}

	formatPid(pid: number): string {
		return `[${this.code}] ${pid}  - `;
	}
}
