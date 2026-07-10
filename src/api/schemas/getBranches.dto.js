import { z } from "zod";

import { CoordinatesSchema } from "./branchShared.dto";

/*
|--------------------------------------------------------------------------
| Query Parameters
|--------------------------------------------------------------------------
*/

export const GetBranchesRequestSchema = z.object({
  province: z.string().optional(),

  language: z.string().optional(),

  facility: z.string().optional(),

  service: z.string().optional(),

  search: z.string().optional(),

  page: z.coerce.number().int().positive().default(1),

  pageSize: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(60),
});

/*
|--------------------------------------------------------------------------
| Response
|--------------------------------------------------------------------------
*/

export const BranchSummarySchema = z.object({
  id: z.string(),

  name: z.string(),

  province: z.string(),

  address: z.string(),

  coordinates: CoordinatesSchema,

  rating: z.number().nullable(),

  isOpen: z.boolean(),

  distance: z.number().optional(),
});

export const GetBranchesResponseSchema = z.object({
  success: z.boolean(),

  branches: z.array(BranchSummarySchema),

  total: z.number(),

  page: z.number(),

  pageSize: z.number(),
});