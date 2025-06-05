
import { useParams } from "react-router-dom";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { userId } = useParams();
  const { authState } = useAuth();
  
  // If no userId in URL, it's the user's own profile
  const isOwnProfile = !userId;
  
  // Get user role from auth context, fallback to entrepreneur for demo
  const userRole = authState.userRole || 'entrepreneur';

  return (
    <UserProfile 
      userRole={userRole} 
      isOwnProfile={isOwnProfile}
    />
  );
};

export default Profile;
