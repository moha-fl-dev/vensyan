import { supaBaseClient } from "@vensyan/shared/utils";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  ConfirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' })
}).refine((val) => val.password === val.ConfirmPassword, { message: 'Passwords must match', path: ['ConfirmPassword'] })

export type TsignIn = z.infer<typeof SignInSchema>
export type TsignUp = z.infer<typeof SignUpSchema>

export type supabaseServerClientParams = {
  req: NextApiRequest
  res: NextApiResponse
}

export const sectorEnum = z.enum(['Educational', 'Salon', 'Office', 'Cleaning'])

export const AddOrgSchema = z.object({
  organisation_name: z.string().min(1, { message: 'Organisation name must be at least 1 character' }),
  sector: sectorEnum,
  street_name: z.string().min(1, { message: 'Street name must be at least 1 character' }),
  zip_code: z.string().min(1, { message: 'Zip code must be at least 1 character' }),
  city: z.string().min(1, { message: 'City must be at least 1 character' }),
  country: z.string().min(1, { message: 'Country must be at least 1 character' }),
  house_number: z.string().min(1, { message: 'House number must be at least 1 character' }),
})

export type TaddOrganisation = z.infer<typeof AddOrgSchema>

export type SupabaseClientCtx = ReturnType<typeof supaBaseClient>