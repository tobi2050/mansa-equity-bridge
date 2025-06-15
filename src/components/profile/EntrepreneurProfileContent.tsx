
import EntrepreneurTabs from "./entrepreneur/EntrepreneurTabs";

interface EntrepreneurProfileContentProps {
  isOwnProfile?: boolean;
  profile: any;
  businesses: any[];
}

const EntrepreneurProfileContent = ({ isOwnProfile, profile, businesses }: EntrepreneurProfileContentProps) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <EntrepreneurTabs
        profile={profile}
        businesses={businesses || []}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};

export default EntrepreneurProfileContent;
