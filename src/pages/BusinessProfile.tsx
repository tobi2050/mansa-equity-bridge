
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building2, DollarSign, Users, MapPin, Briefcase, TrendingUp, BarChart, FileText, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const fetchBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const BusinessProfile = () => {
    const { businessId } = useParams<{ businessId: string }>();
    const navigate = useNavigate();

    const { data: business, isLoading, isError } = useQuery({
        queryKey: ['business', businessId],
        queryFn: () => fetchBusiness(businessId!),
        enabled: !!businessId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-4">
                <div className="max-w-4xl mx-auto">
                    <Skeleton className="h-12 w-1/3 mb-6" />
                    <Skeleton className="h-40 w-full mb-6" />
                    <Skeleton className="h-60 w-full mb-6" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        )
    }

    if (isError || !business) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4">Business not found</h2>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        )
    }

    const fundingProgress = business.funding_goal && business.current_funding ? (business.current_funding / business.funding_goal) * 100 : 0;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
             {/* Header */}
            <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto flex items-center">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-4">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1 flex items-center gap-4">
                    <Building2 className="w-8 h-8 text-amber-600" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{business.name}</h1>
                        <p className="text-sm text-gray-600">{business.industry}</p>
                    </div>
                    {business.verified && <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1"/> Verified</Badge>}
                </div>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
                 {/* Business Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Business Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">{business.description}</p>
                    </CardContent>
                </Card>

                {/* Key Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Key Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-semibold">{business.location || 'N/A'}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Stage</p>
                                <p className="font-semibold">{business.stage || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="w-6 h-6 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Team Size</p>
                                <p className="font-semibold">{business.employees || 'N/A'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 {/* Funding Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Funding Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-2xl font-bold text-green-600">${(business.current_funding || 0).toLocaleString()}</span>
                                <span className="text-gray-500">raised of ${(business.funding_goal || 0).toLocaleString()} goal</span>
                            </div>
                            <Progress value={fundingProgress} className="h-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                           <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Use of Funds</h4>
                               <p className="text-sm text-gray-600">{business.use_of_funds || 'Not specified'}</p>
                           </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Financials */}
                <Card>
                    <CardHeader>
                        <CardTitle>Financials (Monthly)</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Revenue</p>
                                <p className="font-semibold">${(business.monthly_revenue || 0).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <BarChart className="w-6 h-6 text-red-500" />
                            <div>
                                <p className="text-sm text-gray-500">Expenses</p>
                                <p className="font-semibold">${(business.monthly_expenses || 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                 {/* Documents & Legal - Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle>Documents & Legal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 text-gray-500">
                             <FileText className="w-5 h-5" />
                             <p>Business plan, financial statements, and other documents will be available here.</p>
                        </div>
                    </CardContent>
                </Card>
                
                <div className="pt-4 flex justify-end">
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Invest / Support this Business
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default BusinessProfile;
