import { supaBaseClient } from "@vensyan/shared/utils";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export const SignUpSchema = SignInSchema.extend({
  ConfirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' })
}).refine((val) => val.password === val.ConfirmPassword, { message: 'Passwords must match', path: ['ConfirmPassword'] })

export type TsignIn = z.infer<typeof SignInSchema>

export type SignUpWithConfirmPassword = z.infer<typeof SignUpSchema>

export type TsignUp = Omit<SignUpWithConfirmPassword, "ConfirmPassword"> & {
  hasOrganization: boolean
}

export type supabaseServerClientParams = {
  req: NextApiRequest
  res: NextApiResponse,
  account_type: Account_type
}

export const sector = ['Education', 'Salon supplies', 'Office supplies', 'Cleaning supplies'] as const

export const supplier_type = ['Wholesaler', 'Manufacturer'] as const

export const OrganisationSchema = z.object({
  supplier_name: z.string().min(1, { message: 'Organisation name must be at least 1 character' }),
  supplier_type: z.enum(supplier_type, {
    required_error: 'Supplier type is required',
  }),
  sector: z.enum(sector, {
    required_error: 'Sector is required',
  }),
})

export type Sector = typeof sector[number]

export type Supplier_type = typeof supplier_type[number]


export type Organisation_type = z.infer<typeof OrganisationSchema>

export type SupabaseClientCtx = ReturnType<typeof supaBaseClient>

export type Account_type = "buyer" | "seller"

export interface BaseCtxParams {
  client: SupabaseClientCtx
  account_type: Account_type
}


export type UserMetaData = {
  hasOrganization: boolean
  account_type: Account_type
  sector: Sector
  supplier_type: Supplier_type
}

export type UpdateUserMetaData = Partial<UserMetaData> & {
  user_id: string
}


export type OrganisationWithId = Organisation_type & {
  user_id: string
}