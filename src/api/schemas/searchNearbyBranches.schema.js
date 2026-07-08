import { z } from "zod";

import { BranchSummarySchema } from "./getBranches.schema";

export const SearchNearbyBranchesRequestSchema = z.object({
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const SearchNearbyBranchesResponseSchema = z.object({
  success: z.boolean(),

  branches: z.array(BranchSummarySchema),
});