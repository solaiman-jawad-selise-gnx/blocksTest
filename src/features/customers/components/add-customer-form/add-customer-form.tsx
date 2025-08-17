import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';

// Customer form validation schema
const customerFormSchema = z.object({
  FirstName: z.string().min(1, { message: 'FIRST_NAME_REQUIRED' }),
  LastName: z.string().min(1, { message: 'LAST_NAME_REQUIRED' }),
  NetWorth: z.number().min(0, { message: 'NET_WORTH_MUST_BE_POSITIVE' }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface AddCustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
}

export function AddCustomerForm({ open, onOpenChange, onSubmit }: AddCustomerFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      NetWorth: 0,
    },
  });

  const handleSubmit = async (values: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  // Helper function to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTranslation('ADD_CUSTOMER', 'Add Customer')}</DialogTitle>
          <DialogDescription>
            {getTranslation('ADD_CUSTOMER_DESCRIPTION', 'Enter customer information to add a new customer to the system.')}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation('FIRST_NAME', 'First Name')}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={getTranslation('ENTER_FIRST_NAME', 'Enter first name')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation('LAST_NAME', 'Last Name')}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={getTranslation('ENTER_LAST_NAME', 'Enter last name')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="NetWorth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation('NET_WORTH', 'Net Worth')}*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={getTranslation('ENTER_NET_WORTH', 'Enter net worth')}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                {t('CANCEL')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? getTranslation('ADDING', 'Adding...') : getTranslation('ADD_CUSTOMER', 'Add Customer')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
