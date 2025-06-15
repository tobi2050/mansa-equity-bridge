
import React from 'react';
import { useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateBusinessSchema } from '@/lib/validations';

const BusinessDetailsSection = () => {
  const { control } = useFormContext<z.infer<typeof CreateBusinessSchema>>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium border-b pb-2">Business Details</h3>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Your amazing business" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField control={control} name="industry" render={({ field }) => (
            <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., AgriTech, FinTech" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={control} name="stage" render={({ field }) => (
            <FormItem><FormLabel>Business Stage</FormLabel><FormControl><Input placeholder="e.g., Idea, MVP, Scaling" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>
      <FormField control={control} name="location" render={({ field }) => (
          <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="City, Country" {...field} /></FormControl><FormMessage /></FormItem>
      )} />
       <FormField control={control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Business Description</FormLabel><FormControl><Textarea placeholder="Describe your business mission, vision, and value proposition." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <div className="grid md:grid-cols-2 gap-4">
        <FormField control={control} name="funding_goal" render={({ field }) => (
            <FormItem><FormLabel>Funding Goal ($)</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <FormField control={control} name="employees" render={({ field }) => (
            <FormItem><FormLabel>Number of Employees</FormLabel><FormControl><Input placeholder="e.g., 1-10, 11-50" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>
       <div className="grid md:grid-cols-2 gap-4">
        <FormField control={control} name="monthly_revenue" render={({ field }) => (
            <FormItem><FormLabel>Est. Monthly Revenue ($)</FormLabel><FormControl><Input type="number" placeholder="10000" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={control} name="monthly_expenses" render={({ field }) => (
            <FormItem><FormLabel>Est. Monthly Expenses ($)</FormLabel><FormControl><Input type="number" placeholder="5000" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>
       <FormField control={control} name="use_of_funds" render={({ field }) => (
          <FormItem><FormLabel>How will the funds be used?</FormLabel><FormControl><Textarea placeholder="e.g., Product development, marketing, team expansion..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
      )} />
    </div>
  );
};

export default BusinessDetailsSection;
