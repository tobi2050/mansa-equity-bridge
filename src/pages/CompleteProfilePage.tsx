
import CompleteProfile from "@/components/CompleteProfile";
import { useAuth } from "@/contexts/AuthContext";

const CompleteProfilePage = () => {
  const { authState } = useAuth();
  
  // Get user role from auth context, fallback to entrepreneur for demo
  const userRole = authState.userRole || 'entrepreneur';

  return <CompleteProfile userRole={userRole} />;
};

export default CompleteProfilePage;
