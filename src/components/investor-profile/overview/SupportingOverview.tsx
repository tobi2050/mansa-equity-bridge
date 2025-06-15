
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Building2 } from "lucide-react";

export const SupportingOverview = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="text-blue-500" />
            Supporting Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            As a supporter, you validate businesses and help them grow. Your support is crucial for the ecosystem.
            This feature is currently under development.
          </p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Support Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Businesses Validated</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Handshake className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Community Trust Score</p>
                <p className="text-2xl font-bold">85</p>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
