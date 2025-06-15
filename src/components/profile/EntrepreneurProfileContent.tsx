import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EntrepreneurProfileContentProps {
  isOwnProfile?: boolean;
}

const EntrepreneurProfileContent = ({ isOwnProfile }: EntrepreneurProfileContentProps) => {
  // Mock data for now, will be replaced with real data fetching
  const businesses = [
    { id: 1, name: "AgriTech Solutions", description: "Revolutionizing farming in Africa." },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Businesses</CardTitle>
        </CardHeader>
        <CardContent>
          {businesses.length > 0 ? (
            <ul className="space-y-2">
              {businesses.map(b => (
                <li key={b.id} className="p-2 border rounded">
                  <h4 className="font-semibold">{b.name}</h4>
                  <p className="text-sm text-gray-600">{b.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No businesses listed yet.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Other tabs like Activity, About etc. will go here */}
    </div>
  );
}

export default EntrepreneurProfileContent;
