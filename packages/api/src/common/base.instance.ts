/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { uuid } from 'ferramenta';
import { AppLogger } from '@app/app.logger';

export class BaseInstance {
	static instances: Record<string, any>;
	public uuid: string;
	public logger: AppLogger;

	constructor() {
		BaseInstance.instances ??= []; // Initialize instances
		BaseInstance.instances[this.constructor.name] ??= this; // Keep first instance of each class
		this.logger = new AppLogger(this.constructor.name);
		this.uuid = uuid();
	}
}
