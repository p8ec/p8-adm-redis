/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

/**
 * Conditional method decorator, used to disable a method
 * @param condition boolean Enable or disable the method
 * @param error Error Throw an error if the method is disabled
 */
export const ConditionalMethod = (condition?: boolean, error?: Error): MethodDecorator => {
	return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		if (!condition) {
			descriptor.value = () => {
				if (error) {
					throw error;
				} else {
					throw new Error('Method is not available');
				}
			};
		}

		return descriptor;
	};
};

export const ConditionalProperty = (condition?: boolean): PropertyDecorator => {
	return (target: any, propertyKey: string | symbol) => {
		if (!condition) {
			delete target[propertyKey];
		}
	};
};
