
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Building2, DollarSign, Users, Target, Calendar, Edit, Eye } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const EntrepreneurProjects = () => {
  const navigate = useNavigate();
  const userRole = 'entrepreneur' as const;

  const [projects] = useState([
    {
      id: 1,
      name: "EcoFarm Nigeria",
      description: "Sustainable agriculture platform connecting farmers with consumers",
      status: "Active",
      funding: { raised: 45000, target: 100000 },
      investors: 12,
      milestones: { completed: 3, total: 5 },
      progress: 60,
      category: "Agriculture",
      location: "Lagos, Nigeria"
    },
    {
      id: 2,
      name: "Solar Tech Solutions",
      description: "Affordable solar panel installation for rural communities",
      status: "Funding",
      funding: { raised: 15000, target: 50000 },
      investors: 5,
      milestones: { completed: 1, total: 4 },
      progress: 30,
      category: "Clean Energy",
      location: "Accra, Ghana"
    },
    {
      id: 3,
      name: "FinTech Mobile App",
      description: "Digital banking solution for unbanked populations",
      status: "Planning",
      funding: { raised: 0, target: 75000 },
      investors: 0,
      milestones: { completed: 0, total: 5 },
      progress: 10,
      category: "FinTech",
      location: "Nairobi, Kenya"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Funding': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Projects</h1>
              <p className="text-xs text-gray-600">Manage your business projects and funding</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/entrepreneur-create')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-xs text-gray-600">Total Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">$60K</div>
              <div className="text-xs text-gray-600">Total Raised</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">17</div>
              <div className="text-xs text-gray-600">Total Investors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">4/14</div>
              <div className="text-xs text-gray-600">Milestones</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)} variant="secondary">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Funding Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Progress</span>
                    <span>${project.funding.raised.toLocaleString()} / ${project.funding.target.toLocaleString()}</span>
                  </div>
                  <Progress value={(project.funding.raised / project.funding.target) * 100} className="h-2" />
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{project.investors} investors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span>{project.milestones.completed}/{project.milestones.total} milestones</span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Category: {project.category}</div>
                  <div>Location: {project.location}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for New Users */}
        {projects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">Create your first project to start raising funds from investors</p>
              <Button 
                onClick={() => navigate('/entrepreneur-create')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNavigation userRole={userRole} />
    </div>
  );
};

export default EntrepreneurProjects;
