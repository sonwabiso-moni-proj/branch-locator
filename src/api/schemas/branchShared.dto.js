import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string(),
  suburb: z.string().nullable().optional(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string().nullable().optional(),
});

export const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const ContactSchema = z.object({
  phone: z.string(),
  email: z.string().email().nullable().optional(),
});

export const OperatingHoursSchema = z.object({
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string(),
});

export const BusyTimeSchema = z.object({
  time: z.string(),
  level: z.enum([
    "Not Busy",
    "Moderate",
    "Busy",
    "Very Busy",
  ]),
});