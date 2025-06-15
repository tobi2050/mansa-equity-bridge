
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateBusinessSchema } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import React from "react";

const CreateBusiness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateBusinessSchema>>({
    resolver: zodResolver(CreateBusinessSchema),
    defaultValues: {
      name: "",
      industry: "",
      stage: "",
      location: "",
      description: "",
      funding_goal: 0,
      monthly_revenue: undefined,
      monthly_expenses: undefined,
      employees: "",
      use_of_funds: ""
    },
  });

  const createBusinessMutation = useMutation({
    mutationFn: async (values: z.infer<typeof CreateBusinessSchema>) => {
      if (!user) throw new Error("You must be logged in to create a business.");

      const { data, error } = await supabase
        .from('businesses')
        .insert({
          ...values,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // TODO: Handle file uploads for verification documents
      
      return data;
    },
    onSuccess: (data) => {
      toast({ title: "Success!", description: "Your business has been listed." });
      navigate(`/business/${data.id}`);
    },
    onError: (error) => {
      toast({ title: "Error creating business", description: error.message, variant: "destructive" });
    },
  });

  function onSubmit(values: z.infer<typeof CreateBusinessSchema>) {
    // TODO: Add check for uploaded verification files
    createBusinessMutation.mutate(values);
  }
  
  const FileUploadField = ({ name, required }: { name: string, required?: boolean}) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{name}</label>
        {required && (
          <Badge variant="outline" className="text-red-600">Required</Badge>
        )}
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 transition-colors">
        <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">Upload {name}</p>
        <Input type="file" className="sr-only" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>New Business Listing</CardTitle>
            <CardDescription>
              Fill out the form below to list a new business opportunity for investors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium border-b pb-2">Business Details</h3>
                  <FormField
                    control={form.control}
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
                    <FormField control={form.control} name="industry" render={({ field }) => (
                        <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., AgriTech, FinTech" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="stage" render={({ field }) => (
                        <FormItem><FormLabel>Business Stage</FormLabel><FormControl><Input placeholder="e.g., Idea, MVP, Scaling" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="City, Country" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Business Description</FormLabel><FormControl><Textarea placeholder="Describe your business mission, vision, and value proposition." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="funding_goal" render={({ field }) => (
                        <FormItem><FormLabel>Funding Goal ($)</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="employees" render={({ field }) => (
                        <FormItem><FormLabel>Number of Employees</FormLabel><FormControl><Input placeholder="e.g., 1-10, 11-50" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                   <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="monthly_revenue" render={({ field }) => (
                        <FormItem><FormLabel>Est. Monthly Revenue ($)</FormLabel><FormControl><Input type="number" placeholder="10000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="monthly_expenses" render={({ field }) => (
                        <FormItem><FormLabel>Est. Monthly Expenses ($)</FormLabel><FormControl><Input type="number" placeholder="5000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                   <FormField control={form.control} name="use_of_funds" render={({ field }) => (
                      <FormItem><FormLabel>How will the funds be used?</FormLabel><FormControl><Textarea placeholder="e.g., Product development, marketing, team expansion..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium border-b pb-2">Verification Documents</h3>
                  <p className="text-sm text-muted-foreground">For security and trust, we require these documents to verify you and your business.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FileUploadField name="Government ID / Passport" required />
                    <FileUploadField name="Business Registration" required />
                    <FileUploadField name="Proof of Address" />
                    <FileUploadField name="Bank Statement" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  disabled={createBusinessMutation.isPending}
                >
                  {createBusinessMutation.isPending ? 'Submitting...' : 'Submit for Review'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBusiness;
