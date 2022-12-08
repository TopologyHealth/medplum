/*
 * Generated by @medplum/generator
 * Do not edit manually.
 */

import { PoolClient } from 'pg';

export async function run(client: PoolClient): Promise<void> {
  await client.query(`CREATE TABLE IF NOT EXISTS "BulkDataExport" (
    "id" UUID NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "compartments" UUID[] NOT NULL,
    "status" TEXT
  )`);

  await client.query(`CREATE TABLE IF NOT EXISTS "BulkDataExport_History" (
    "versionId" UUID NOT NULL PRIMARY KEY,
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP WITH TIME ZONE NOT NULL
  )`);

  await client.query('CREATE INDEX ON "BulkDataExport" ("lastUpdated")');
  await client.query('CREATE INDEX ON "BulkDataExport" USING GIN("compartments")');
  await client.query('CREATE INDEX ON "BulkDataExport_History" ("id")');
  await client.query('CREATE INDEX ON "BulkDataExport_History" ("lastUpdated")');
}
