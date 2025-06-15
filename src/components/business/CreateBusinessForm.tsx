
import React from 'react';
import { UseFormReturn, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CreateBusinessSchema } from '@/lib/validations';
import BusinessDetailsSection from './BusinessDetailsSection';
import VerificationDocsSection from './VerificationDocsSection';

interface CreateBusinessFormProps {
  form: UseFormReturn<z.infer<typeof CreateBusinessSchema>>;
  onSubmit: (values: z.infer<typeof CreateBusinessSchema>) => void;
  isPending: boolean;
}

const CreateBusinessForm: React.FC<CreateBusinessFormProps> = ({ form, onSubmit, isPending }) => {
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BusinessDetailsSection />
          <VerificationDocsSection />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default CreateBusinessForm;
