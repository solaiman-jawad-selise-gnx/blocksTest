import { z } from 'zod';

/**
 * Sign Up Form Schema
 *
 * Defines the validation schema, type definition, and default values for the user sign-up form.
 * This module ensures that the username field is not left empty.
 *
 * Exports:
 * - signupFormValidationSchema: Zod validation schema for the sign-up form
 * - signupFormType: TypeScript type for the sign-up form, inferred from the schema
 * - signupFormDefaultValue: Default initial values for the sign-up form
 *
 * @module signupForm
 */

export const getSignupFormValidationSchema = (t: (key: string) => string) => z.object({
  username: z.string().min(1, { message: t('USER_NAME_CANT_EMPTY') }),
});

export type signupFormType = z.infer<ReturnType<typeof getSignupFormValidationSchema>>;

export const signupFormDefaultValue: signupFormType = {
  username: '',
};
