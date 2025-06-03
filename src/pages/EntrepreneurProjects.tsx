
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Calendar, MessageSquare, Plus, Edit, Eye } from "lucide-react";

const EntrepreneurProjects = () => {
  const navigate = useNavigate();
  const [projects] = useState([
    {
      id: 1,
      title: "EcoFarm Nigeria - Organic Agriculture",
      description: "Sustainable farming initiative connecting rural farmers with urban markets through organic certification and digital marketplace.",
      stage: "Scaling",
      fundingGoal: 75000,
      currentFunding: 45000,
      category: "Agriculture",
      equityOffered: 15,
      bidders: 8,
      timeLeft: "12 days",
      milestones: 5,
      completedMilestones: 3,
      status: "Active",
      comments: 24
    },
    {
      id: 2,
      title: "Lagos FinTech Solutions",
      description: "Mobile payment platform for small businesses across West Africa with focus on rural accessibility.",
      stage: "MVP",
      fundingGoal: 120000,
      currentFunding: 78000,
      category: "FinTech",
      equityOffered: 20,
      bidders: 15,
      timeLeft: "8 days",
      milestones: 5,
      completedMilestones: 4,
      status: "Active",
      comments: 42
    },
    {
      id: 3,
      title: "Solar Energy Ghana",
      description: "Affordable solar panel manufacturing and installation for rural communities in Ghana.",
      stage: "Prototype",
      fundingGoal: 95000,
      currentFunding: 12000,
      category: "Energy",
      equityOffered: 18,
      bidders: 3,
      timeLeft: "25 days",
      milestones: 5,
      completedMilestones: 1,
      status: "Active",
      comments: 8
    }
  ]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea': return 'bg-gray-100 text-gray-800';
      case 'Prototype': return 'bg-blue-100 text-blue-800';
      case 'MVP': return 'bg-yellow-100 text-yellow-800';
      case 'Scaling': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
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
            onClick={() => navigate('/create-project')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="space-y-6">
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${projects.reduce((sum, p) => sum + p.currentFunding, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Funded</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {projects.reduce((sum, p) => sum + p.bidders, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Bidders</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {Math.round((projects.reduce((sum, p) => sum + (p.currentFunding / p.fundingGoal), 0) / projects.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Avg. Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Projects list */}
          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStageColor(project.stage)}>
                        {project.stage}
                      </Badge>
                      <Badge variant="outline">
                        {project.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Funding Progress</span>
                        <span className="font-medium">
                          ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={(project.currentFunding / project.fundingGoal) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Milestones</span>
                        <span className="font-medium">
                          {project.completedMilestones} / {project.milestones}
                        </span>
                      </div>
                      <Progress 
                        value={(project.completedMilestones / project.milestones) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Equity Offered:</span>
                      <p className="font-medium">{project.equityOffered}%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Active Bidders:</span>
                      <p className="font-medium">{project.bidders}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Comments:</span>
                      <p className="font-medium">{project.comments}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time Remaining:</span>
                      <p className="font-medium">{project.timeLeft}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.bidders} bidders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{project.comments} comments</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.timeLeft} left</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Messages
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurProjects;
