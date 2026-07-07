import { z } from "zod";

import {
  AddressSchema,
  BusyTimeSchema,
  ContactSchema,
  CoordinatesSchema,
  OperatingHoursSchema,
} from "./common.schema";

/*
|--------------------------------------------------------------------------
| Path Params
|--------------------------------------------------------------------------
*/

export const GetBranchByIdParamsSchema = z.object({
  branchId: z.string(),
});

/*
|--------------------------------------------------------------------------
| Response
|--------------------------------------------------------------------------
*/

export const GetBranchByIdResponseSchema = z.object({
  id: z.string(),

  name: z.string(),

  province: z.string(),

  address: AddressSchema,

  coordinates: CoordinatesSchema.optional(),

  languages: z.array(z.string()),

  facilities: z.array(z.string()),

  services: z.array(z.string()),

  operatingHours: OperatingHoursSchema,

  contacts: ContactSchema,

  rating: z.number().nullable(),

  busyTimes: z
    .record(z.string(), z.array(BusyTimeSchema))
    .optional(),

  imageUrl: z.string().url().nullable().optional(),

  notes: z.string().nullable().optional(),
});