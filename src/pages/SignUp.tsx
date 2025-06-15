
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MultiSelect, Framework } from "@/components/ui/multi-select";
import { industryCategories } from "@/lib/constants";
import { SignUpSchema } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type SignUpFormValues = Omit<z.infer<typeof SignUpSchema>, "industryPreferences"> & {
  industryPreferences?: Framework[];
};

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: undefined,
      organizationType: "Individual",
      investmentMotivation: "ROI-focused",
      industryPreferences: [],
      defaultContributionMode: "investing",
    },
  });

  const userType = form.watch("userType");

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: `${values.firstName} ${values.lastName}`,
          user_type: values.userType,
          ...(values.userType === 'investor' && {
            organization_type: values.organizationType,
            investment_motivation: values.investmentMotivation,
            industry_preferences: values.industryPreferences?.map(p => p.value),
            default_contribution_mode: values.defaultContributionMode,
          }),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      }
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred during sign up. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created Successfully",
        description: "Please check your email for a confirmation link to complete your registration.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-amber-600">Join MANSA</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>I am a:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="entrepreneur" id="r-entrepreneur" />
                          </FormControl>
                          <Label htmlFor="r-entrepreneur" className="font-normal">Entrepreneur</Label>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                           <FormControl>
                            <RadioGroupItem value="investor" id="r-investor" />
                          </FormControl>
                          <Label htmlFor="r-investor" className="font-normal">Investor / Supporter</Label>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {userType === 'investor' && (
                <div className="space-y-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-gray-800">Investor Details</h3>
                  <FormField
                    control={form.control}
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Organization Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Individual">Individual</SelectItem>
                            <SelectItem value="NGO">NGO</SelectItem>
                            <SelectItem value="Charity">Charity</SelectItem>
                            <SelectItem value="Investment Firm">Investment Firm</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investmentMotivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Primary Motivation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ROI-focused">ROI-focused</SelectItem>
                            <SelectItem value="Impact-focused">Impact-focused</SelectItem>
                            <SelectItem value="Mixed">Mixed (ROI & Impact)</SelectItem>
                          </SelectContent>
                        </Select>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industryPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industries of Interest (up to 3)</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={industryCategories}
                            selected={field.value || []}
                            onChange={field.onChange}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-1">Select your preferred investment sectors.</p>
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="defaultContributionMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Contribution Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="investing">Investing</SelectItem>
                            <SelectItem value="donating">Donating</SelectItem>
                            <SelectItem value="supporting">Supporting</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-1">This will be your default action on projects.</p>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} />
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Button variant="link" onClick={() => navigate("/login")} className="p-0">
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
