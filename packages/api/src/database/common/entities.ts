/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn,
} from 'typeorm';

export const SYSTEM_COLUMN_PREFIX = '__';

export type NoSystemColumns<T> = Omit<T, 'id'>;

/**
 * Base Entity
 */
@Entity()
export class BaseEntity {
	static SYSTEM_COLUMNS_PREFIX = new RegExp(`^${SYSTEM_COLUMN_PREFIX}.*`);

	@PrimaryGeneratedColumn('uuid', { name: '_uuid', comment: 'Unique ID' })
	id: string;

	@CreateDateColumn({
		type: 'timestamp with time zone',
		select: false,
		name: SYSTEM_COLUMN_PREFIX + 'crd',
		comment: 'Created Date',
	})
	created?: Date;
}

/**
 * Versioned Entity
 * Adds a `version` and `updated` column to the entity
 * @see: https://typeorm.io/#/entities/version-column
 */
@Entity()
export class VersionedEntity extends BaseEntity {
	@UpdateDateColumn({
		type: 'timestamp with time zone',
		select: false,
		name: SYSTEM_COLUMN_PREFIX + 'upd',
		comment: 'Updated Date',
	})
	updated?: Date;

	@VersionColumn({ select: false, name: SYSTEM_COLUMN_PREFIX + 'ver', comment: 'Version' })
	version?: number;
}

/**
 * Immutable Entity
 * Adds a `deleted` column to the entity
 */
@Entity()
export class ImmutableEntity extends BaseEntity {
	// @see: https://typeorm.io/#/decorator-reference/deletedatecolumn
	@DeleteDateColumn({
		type: 'timestamp with time zone',
		select: false,
		name: SYSTEM_COLUMN_PREFIX + 'del',
		comment: 'Deleted Date',
	})
	deleted?: Date;
}

/**
 * Immutable Versioned Entity
 * Adds a `version`, `updated` and `deleted` column to the entity
 */
@Entity()
export class ImmutableVersionedEntity extends VersionedEntity {
	// @see: https://typeorm.io/#/decorator-reference/deletedatecolumn
	@DeleteDateColumn({
		type: 'timestamp with time zone',
		select: false,
		name: SYSTEM_COLUMN_PREFIX + 'del',
		comment: 'Deleted Date',
	})
	deleted?: Date;
}
