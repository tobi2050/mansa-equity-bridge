
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export const PendingApprovals = () => {
  const { data: approvals, isLoading } = useQuery({
    queryKey: ['pendingApprovals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('name, description')
        .limit(2); // Mocking pending approvals with first 2 businesses
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Milestone Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
            [1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-full max-w-lg" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-[70px]" />
                  <Skeleton className="h-9 w-[80px]" />
                </div>
              </div>
            ))
          ) : approvals && approvals.length > 0 ? (
            approvals.map((approval, i) => (
              <div key={approval.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{approval.name} - Milestone {i + 2}</h4>
                  <p className="text-sm text-gray-600">{approval.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Review</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending approvals found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
