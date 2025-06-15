
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Building2, CheckCircle, AlertCircle } from "lucide-react";
import VerificationTrustSection from "./VerificationTrustSection";

const getProfileCompletion = (profile: any, businesses: any[]) => {
  let score = 40;
  if (profile.bio) score += 15;
  if (profile.business_verified) score += 15;
  if (businesses.length > 0) score += 15;
  if (profile.identity_verified) score += 10;
  if (profile.email_verified) score += 5;
  return Math.min(score, 100);
};

interface EntrepreneurHeroSectionProps {
  profile: any;
  businesses: any[];
  isOwnProfile?: boolean;
}

const EntrepreneurHeroSection = ({ profile, businesses, isOwnProfile }: EntrepreneurHeroSectionProps) => {
  const completion = getProfileCompletion(profile, businesses);

  return (
    <Card className="bg-gradient-to-tr from-orange-500/80 to-amber-400/60 text-white shadow-xl mb-2 relative overflow-hidden">
      <CardContent className="py-9 px-6 flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
        <div>
          <h2 className="text-3xl font-bold drop-shadow">{profile.full_name}</h2>
          <div className="flex items-center mt-1 gap-2">
            <Badge variant="secondary" className="capitalize bg-white/70 text-orange-800">
              <User className="w-4 h-4 mr-1 text-orange-700" />
              Entrepreneur
            </Badge>
            {profile.business_verified && (
              <Badge variant="outline" className="border-green-500 text-green-700 bg-white/70">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified Business
              </Badge>
            )}
          </div>
          <p className="text-md mt-2 text-white/90">{profile.bio || "No bio added yet."}</p>
        </div>
        <div className="mt-5 md:mt-0 md:ml-12 flex flex-col gap-3 items-start">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="w-5 h-5" />
              {businesses.length} Businesses
            </div>
            <div className="text-xs">Total businesses you've launched</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Trust Score: {profile.trust_score || 0}
            </div>
            <div className="text-xs">The higher your trust, the more investors will discover you</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <AlertCircle className="w-5 h-5 text-amber-200" />
              Profile {completion}% complete
            </div>
            <Progress value={completion} className="w-40 h-2 bg-white/30" />
          </div>
        </div>
      </CardContent>
      {/* Verification & trust badges below hero */}
      <div className="bg-white/90 px-4 py-2 border-t border-white/50 mt-0">
        <VerificationTrustSection profile={profile} />
      </div>
    </Card>
  );
};

export default EntrepreneurHeroSection;
