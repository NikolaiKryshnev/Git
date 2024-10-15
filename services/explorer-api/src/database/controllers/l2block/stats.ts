import { eq, sql } from 'drizzle-orm';
import { getDb as db } from '../../../database/index.js';
import {
  l2Block,
  header,
  globalVariables,
} from '../../../database/schema/l2block/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export const getAverageFees = async (): Promise<number> => {
  // TODO: we need l2Block.header.totalFees as number to average this
  return -1;
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getAverageBlockTime = async (): Promise<number> => {
  const result = await db()
    .select({
      avgBlockTime: sql<number>`
        (MAX(${globalVariables.timestamp}) - MIN(${globalVariables.timestamp})) / NULLIF(MAX(${l2Block.height}) - MIN(${l2Block.height}), 0)
      `.as('avg_block_time'),
    })
    .from(l2Block)
    .innerJoin(header, eq(l2Block.headerId, header.id))
    .innerJoin(
      globalVariables,
      eq(header.globalVariablesId, globalVariables.id),
    );

  return Number(result[0]?.avgBlockTime) ?? -1;
};
