
import UserProfile from "@/components/UserProfile";

const Profile = () => {
  // All logic is now moved into the UserProfile component,
  // which uses useParams and useAuth internally to fetch the correct profile.
  return <UserProfile />;
};

export default Profile;
