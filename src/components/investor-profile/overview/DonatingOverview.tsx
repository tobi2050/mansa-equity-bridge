
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Heart } from "lucide-react";

export const DonatingOverview = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-red-500" />
            Donating Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Here you can track your donations, see their impact, and find new causes to support.
            This feature is currently under development.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Donation Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Donated</p>
                <p className="text-2xl font-bold">$5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Causes Supported</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
