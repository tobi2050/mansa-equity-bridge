
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface InvestorDashboardHeaderProps {
  isOwnProfile: boolean;
  profileCompletion: number;
}

export const InvestorDashboardHeader = ({ isOwnProfile, profileCompletion }: InvestorDashboardHeaderProps) => {
  return (
    <>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Investor Dashboard</h1>
              <p className="text-blue-700 mt-1">Manage your investment portfolio and discover opportunities</p>
            </div>
            {isOwnProfile && profileCompletion < 50 && (
              <Badge variant="destructive">Profile Incomplete</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {isOwnProfile && profileCompletion < 50 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-800">Complete Your Investor Profile</h3>
                <p className="text-sm text-red-600">Minimum 50% completion required for investment access</p>
                <Progress value={profileCompletion} className="w-48 mt-2" />
                <span className="text-xs text-red-600">{profileCompletion}% complete</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
