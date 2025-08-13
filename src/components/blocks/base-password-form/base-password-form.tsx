import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { UPasswordInput } from 'components/core/u-password-input';
import { SharedPasswordStrengthChecker } from '../../core/shared-password-strength-checker';
import { Captcha } from 'features/captcha';
import { useTranslation } from 'react-i18next';

/**
 * BasePasswordForm Component
 *
 * A form component for password creation/reset that includes validation, strength checking,
 * and optional CAPTCHA verification for enhanced security.
 *
 * Features:
 * - Password and confirmation fields with validation
 * - Password strength requirements checker
 * - Optional Google reCAPTCHA integration
 * - Form state management using React Hook Form
 * - Zod schema validation
 * - Loading state handling
 * - Navigation after successful submission
 *
 * Props:
 * @param {string} code - Verification code used for the password operation
 * @param {(password: string, code: string, captchaToken?: string) => Promise<void>} onSubmit - Callback for form submission
 * @param {z.ZodSchema} validationSchema - Zod schema for form validation
 * @param {{password: string, confirmPassword: string}} defaultValues - Default values for the form fields
 * @param {boolean} isPending - Loading state flag for form submission
 * @param {boolean} [isCaptchaValid] - Optional flag indicating if CAPTCHA is valid
 * @param {(isValid: boolean) => void} [onCaptchaValidation] - Optional callback when CAPTCHA validation state changes
 *
 * @returns {JSX.Element} A password form with validation and optional CAPTCHA
 *
 * @example
 * // Basic usage
 * <BasePasswordForm
 *   code="reset123"
 *   onSubmit={handlePasswordReset}
 *   validationSchema={passwordSchema}
 *   defaultValues={{ password: "", confirmPassword: "" }}
 *   isPending={isSubmitting}
 *   onCaptchaValidation={setIsCaptchaValid}
 * />
 */

interface BasePasswordFormProps {
  code: string;
  onSubmit: (password: string, code: string, captchaToken?: string) => Promise<void>;
  validationSchema: z.ZodSchema;
  defaultValues: {
    password: string;
    confirmPassword: string;
  };
  isPending: boolean;
  isCaptchaValid?: boolean;
  onCaptchaValidation?: (isValid: boolean) => void;
}

export const BasePasswordForm: React.FC<BasePasswordFormProps> = ({
  code,
  onSubmit,
  validationSchema,
  defaultValues,
  isPending,
  onCaptchaValidation,
}) => {
  const navigate = useNavigate();
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { t } = useTranslation();

  const googleSiteKey = process.env.REACT_APP_CAPTCHA_SITE_KEY ?? '';
  // Check if captcha is enabled (site key is not empty)
  const captchaEnabled = googleSiteKey !== '';

  const form = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');

  useEffect(() => {
    if (
      captchaEnabled &&
      requirementsMet &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
      if (captchaToken) {
        setCaptchaToken('');
        if (onCaptchaValidation) {
          onCaptchaValidation(false);
        }
      }
    }
  }, [
    requirementsMet,
    password,
    confirmPassword,
    captchaToken,
    onCaptchaValidation,
    captchaEnabled,
  ]);

  const handleCaptchaVerify = (token: React.SetStateAction<string>) => {
    setCaptchaToken(token);
    if (onCaptchaValidation) {
      onCaptchaValidation(!!token);
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken('');
    if (onCaptchaValidation) {
      onCaptchaValidation(false);
    }
  };

  const onSubmitHandler = async (values: { password: string; confirmPassword: string }) => {
    if (captchaEnabled && !captchaToken) {
      return;
    }

    try {
      await onSubmit(values.password, code, captchaEnabled ? captchaToken : undefined);
      navigate('/success');
    } catch (_error) {
      // Handle error if needed
    }
  };

  const isSubmitDisabled = isPending || !requirementsMet || (captchaEnabled && !captchaToken);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-high-emphasis font-normal">{t('PASSWORD')}</FormLabel>
              <FormControl>
                <UPasswordInput placeholder={t('ENTER_YOUR_PASSWORD')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-high-emphasis font-normal">
                {t('CONFIRM_PASSWORD')}
              </FormLabel>
              <FormControl>
                <UPasswordInput placeholder={t('CONFIRM_YOUR_PASSWORD')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SharedPasswordStrengthChecker
          password={password}
          confirmPassword={confirmPassword}
          onRequirementsMet={setRequirementsMet}
        />

        {captchaEnabled && showCaptcha && (
          <div className="my-4">
            <Captcha
              type={process.env.REACT_APP_CAPTCHA_TYPE === 'reCaptcha' ? 'reCaptcha' : 'hCaptcha'}
              siteKey={googleSiteKey}
              theme="light"
              onVerify={handleCaptchaVerify}
              onExpired={handleCaptchaExpired}
              size="normal"
            />
          </div>
        )}

        <div className="flex gap-10 mt-5">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            loading={isPending}
            disabled={isSubmitDisabled}
          >
            {t('CONFIRM')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
