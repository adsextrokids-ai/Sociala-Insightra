import { z } from 'zod'

const passwordRules = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine(v => /[A-Z]/.test(v), 'Include at least one uppercase letter')
  .refine(v => /[0-9]/.test(v), 'Include at least one number')

export const loginSchema = z.object({
  email:    z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = z
  .object({
    full_name:        z.string().min(2, 'Please enter your full name'),
    email:            z.string().email('Please enter a valid email address'),
    password:         passwordRules,
    confirm_password: z.string(),
    terms:            z.boolean().refine(v => v === true, 'You must accept the terms to continue'),
  })
  .refine(d => d.password === d.confirm_password, {
    message: 'Passwords do not match',
    path:    ['confirm_password'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const resetPasswordSchema = z
  .object({
    password:         passwordRules,
    confirm_password: z.string(),
  })
  .refine(d => d.password === d.confirm_password, {
    message: 'Passwords do not match',
    path:    ['confirm_password'],
  })
