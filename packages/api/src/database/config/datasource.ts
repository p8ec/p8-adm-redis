/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

/**
 * This datasource is used for typeorm cli.
 * Example: ts-node node_modules/.bin/typeorm -d src/database/config/datasource.ts
 */

import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';

export default new DataSource(databaseConfig().datasource);
