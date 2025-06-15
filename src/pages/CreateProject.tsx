
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const CreateProject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>New Project</CardTitle>
            <CardDescription>
              Start a new project within one of your existing businesses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Project creation form will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProject;
