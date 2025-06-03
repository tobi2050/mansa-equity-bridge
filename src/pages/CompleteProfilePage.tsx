
import CompleteProfile from "@/components/CompleteProfile";

const CompleteProfilePage = () => {
  // This would normally get the user role from auth context
  const userRole = 'entrepreneur' as const;

  return <CompleteProfile userRole={userRole} />;
};

export default CompleteProfilePage;
