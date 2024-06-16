/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { EventEmitter } from 'events';
import { BaseInstance } from '@common/base.instance';
import { AppLogger } from '@app/app.logger';
import { uuid } from 'ferramenta';

class EventService extends EventEmitter implements BaseInstance {
	static instance: any;
	public uuid: string;
	public logger: AppLogger;

	constructor() {
		super();
		EventService.instance = this;
		this.logger = new AppLogger(this.constructor.name);
		this.uuid = uuid();
	}
}

export { EventService };
