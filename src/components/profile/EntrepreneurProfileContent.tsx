
import EntrepreneurStats from "./entrepreneur/EntrepreneurStats";
import EntrepreneurTabs from "./entrepreneur/EntrepreneurTabs";

interface EntrepreneurProfileContentProps {
  isOwnProfile?: boolean;
  profile: any;
  businesses: any[];
}

const EntrepreneurProfileContent = ({ isOwnProfile, profile, businesses }: EntrepreneurProfileContentProps) => {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <EntrepreneurStats profile={profile} businesses={businesses || []} />
      <EntrepreneurTabs
        profile={profile}
        businesses={businesses || []}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};

export default EntrepreneurProfileContent;
