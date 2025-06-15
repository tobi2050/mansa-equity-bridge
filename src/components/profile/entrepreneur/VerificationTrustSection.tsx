
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

const VerificationTrustSection = ({ profile }: { profile: any }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant={profile.email_verified ? "default" : "outline"} className={profile.email_verified ? "bg-green-100 text-green-900" : "border-orange-400 text-orange-700"}>
        {profile.email_verified ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
        Email {profile.email_verified ? "Verified" : "Unverified"}
      </Badge>
      <Badge variant={profile.identity_verified ? "default" : "outline"} className={profile.identity_verified ? "bg-green-100 text-green-900" : "border-orange-400 text-orange-700"}>
        {profile.identity_verified ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
        Identity {profile.identity_verified ? "Verified" : "Unverified"}
      </Badge>
      <Badge variant={profile.business_verified ? "default" : "outline"} className={profile.business_verified ? "bg-green-100 text-green-900" : "border-orange-400 text-orange-700"}>
        {profile.business_verified ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertCircle className="w-4 h-4 mr-1" />}
        Business {profile.business_verified ? "Verified" : "Unverified"}
      </Badge>
    </div>
  );
};

export default VerificationTrustSection;
