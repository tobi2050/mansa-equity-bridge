
import { useParams } from "react-router-dom";
import UserProfile from "@/components/UserProfile";

const Profile = () => {
  const { userId } = useParams();
  
  // This would normally fetch user data based on userId
  // For demo purposes, we'll use mock data
  const userRole = 'entrepreneur' as const;
  const isOwnProfile = !userId; // If no userId in URL, it's the user's own profile

  return (
    <UserProfile 
      userRole={userRole} 
      isOwnProfile={isOwnProfile}
    />
  );
};

export default Profile;
