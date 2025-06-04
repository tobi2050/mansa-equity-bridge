
import HomeFeed from "@/components/HomeFeed";

const Feed = () => {
  // This would normally get the user role from auth context
  const userRole = 'entrepreneur' as const;

  return <HomeFeed userRole={userRole} />;
};

export default Feed;
