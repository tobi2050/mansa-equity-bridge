
import React from 'react';
import { useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';
import { CreateBusinessSchema } from '@/lib/validations';

const VerificationDocsSection = () => {
  const form = useFormContext<z.infer<typeof CreateBusinessSchema>>();

  const renderFileUpload = (name: keyof z.infer<typeof CreateBusinessSchema>, label: string, required?: boolean) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {required && <Badge variant="outline" className="text-red-600 ml-2">Required</Badge>}
            </FormLabel>
            <FormControl>
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 transition-colors">
                <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {form.watch(name)?.[0]?.name ?? 'Upload File'}
                </p>
                <Input
                  type="file"
                  className="sr-only"
                  accept="image/*,application/pdf"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium border-b pb-2">Verification Documents</h3>
      <p className="text-sm text-muted-foreground">For security and trust, we require these documents to verify you and your business.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {renderFileUpload('governmentId', 'Government ID / Passport', true)}
        {renderFileUpload('businessRegistration', 'Business Registration', true)}
        {renderFileUpload('proofOfAddress', 'Proof of Address')}
        {renderFileUpload('bankStatement', 'Bank Statement')}
      </div>
    </div>
  );
};

export default VerificationDocsSection;
