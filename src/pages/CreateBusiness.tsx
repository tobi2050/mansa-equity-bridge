
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateBusinessSchema } from "@/lib/validations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import CreateBusinessForm from "@/components/business/CreateBusinessForm";

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
      use_of_funds: "",
      governmentId: undefined,
      businessRegistration: undefined,
      proofOfAddress: undefined,
      bankStatement: undefined,
    },
  });

  const createBusinessMutation = useMutation({
    mutationFn: async (values: z.infer<typeof CreateBusinessSchema>) => {
      if (!user) throw new Error("You must be logged in to create a business.");

      const {
        // These are separated for future file upload handling
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        governmentId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        businessRegistration,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        proofOfAddress,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        bankStatement,
        ...businessData
      } = values;

      const { data, error } = await supabase
        .from('businesses')
        .insert({
          user_id: user.id,
          name: businessData.name,
          industry: businessData.industry,
          stage: businessData.stage,
          location: businessData.location,
          description: businessData.description,
          funding_goal: businessData.funding_goal,
          monthly_revenue: businessData.monthly_revenue ?? null,
          monthly_expenses: businessData.monthly_expenses ?? null,
          employees: businessData.employees ?? null,
          use_of_funds: businessData.use_of_funds ?? null,
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
            <CreateBusinessForm
              form={form}
              onSubmit={onSubmit}
              isPending={createBusinessMutation.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBusiness;
