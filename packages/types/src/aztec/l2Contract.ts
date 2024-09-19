import { z } from "zod";
import { aztecAddressSchema, bufferSchema, frSchema } from "./utils.js";
import { chicmozL2BlockSchema } from "./l2Block.js";

export const chicmozL2ContractInstanceDeployedEventSchema = z.object({
  address: aztecAddressSchema,
  blockHash: chicmozL2BlockSchema.shape.hash,
  version: z.number(),
  salt: frSchema,
  contractClassId: frSchema,
  initializationHash: frSchema,
  publicKeysHash: frSchema,
  deployer: aztecAddressSchema,
});

export type ChicmozL2ContractInstanceDeployedEvent = z.infer<
  typeof chicmozL2ContractInstanceDeployedEventSchema
>;

export const chicmozL2ContractClassRegisteredEventSchema = z.object({
  blockHash: chicmozL2BlockSchema.shape.hash,
  contractClassId: frSchema,
  version: z.number(),
  artifactHash: frSchema,
  privateFunctionsRoot: frSchema,
  packedPublicBytecode: bufferSchema,
});

export type ChicmozL2ContractClassRegisteredEvent = z.infer<
  typeof chicmozL2ContractClassRegisteredEventSchema
>;

export const chicmozL2ContractInstanceDeluxeSchema = z.object({
  ...chicmozL2ContractInstanceDeployedEventSchema.shape,
  ...chicmozL2ContractClassRegisteredEventSchema.shape,
});

// TODO: come up with a better name for this type
export type ChicmozL2ContractInstanceDeluxe =
  ChicmozL2ContractInstanceDeployedEvent &
    ChicmozL2ContractClassRegisteredEvent;