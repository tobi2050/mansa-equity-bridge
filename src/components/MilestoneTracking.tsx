
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Target, 
  CheckCircle, 
  Clock, 
  Upload, 
  DollarSign,
  FileText,
  Calendar,
  TrendingUp
} from "lucide-react";

const MilestoneTracking = () => {
  const projects = [
    {
      id: 1,
      name: "EcoFarm Nigeria",
      totalMilestones: 5,
      completedMilestones: 4,
      currentMilestone: 5,
      totalFunding: 75000,
      releasedFunding: 60000,
      pendingPayment: 15000,
      milestones: [
        {
          id: 1,
          title: "Business Registration & Legal Setup",
          description: "Complete business registration and legal documentation",
          status: "completed",
          paymentAmount: 15000,
          completedDate: "2024-01-15",
          proofDocument: "business_registration.pdf"
        },
        {
          id: 2,
          title: "Initial Team Hiring & Equipment",
          description: "Hire core team members and purchase essential equipment",
          status: "completed",
          paymentAmount: 15000,
          completedDate: "2024-02-28",
          proofDocument: "team_contracts.pdf"
        },
        {
          id: 3,
          title: "Product Development & Testing",
          description: "Develop MVP and conduct initial testing with target users",
          status: "completed",
          paymentAmount: 15000,
          completedDate: "2024-03-30",
          proofDocument: "mvp_demo.mp4"
        },
        {
          id: 4,
          title: "Market Launch & First Customers",
          description: "Launch product in target market and acquire first 100 customers",
          status: "completed",
          paymentAmount: 15000,
          completedDate: "2024-05-15",
          proofDocument: "customer_metrics.pdf"
        },
        {
          id: 5,
          title: "Scale Operations & Expansion",
          description: "Scale operations to 5 states and reach 1000 customers",
          status: "in_progress",
          paymentAmount: 15000,
          targetDate: "2024-07-30",
          progress: 75
        }
      ]
    },
    {
      id: 2,
      name: "Solar Tech Project",
      totalMilestones: 5,
      completedMilestones: 2,
      currentMilestone: 3,
      totalFunding: 120000,
      releasedFunding: 48000,
      pendingPayment: 0,
      milestones: [
        {
          id: 1,
          title: "Feasibility Study & Site Selection",
          description: "Complete market research and select manufacturing site",
          status: "completed",
          paymentAmount: 24000,
          completedDate: "2024-02-01"
        },
        {
          id: 2,
          title: "Equipment Procurement",
          description: "Purchase and install manufacturing equipment",
          status: "completed",
          paymentAmount: 24000,
          completedDate: "2024-04-15"
        },
        {
          id: 3,
          title: "Production Setup & Testing",
          description: "Set up production line and conduct quality testing",
          status: "in_progress",
          paymentAmount: 24000,
          targetDate: "2024-06-30",
          progress: 40
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Milestone Tracking</h2>
        <p className="text-gray-600">Track progress and manage milestone payments for your projects</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {projects.reduce((sum, p) => sum + p.completedMilestones, 0)}
              </div>
              <div className="text-sm text-gray-600">Completed Milestones</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                ${projects.reduce((sum, p) => sum + p.releasedFunding, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Funding Released</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">
                ${projects.reduce((sum, p) => sum + p.pendingPayment, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Pending Payments</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {projects.filter(p => p.currentMilestone <= p.totalMilestones).length}
              </div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects */}
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription>
                  {project.completedMilestones} of {project.totalMilestones} milestones completed
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  ${project.releasedFunding.toLocaleString()} / ${project.totalFunding.toLocaleString()} released
                </Badge>
                {project.pendingPayment > 0 && (
                  <Badge className="bg-amber-100 text-amber-800">
                    ${project.pendingPayment.toLocaleString()} pending
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Progress 
                value={(project.completedMilestones / project.totalMilestones) * 100} 
                className="h-3"
              />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {project.milestones.map((milestone, index) => (
              <div key={milestone.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-100' : 
                      milestone.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(milestone.status)}>
                    {getStatusIcon(milestone.status)}
                    <span className="ml-1 capitalize">{milestone.status.replace('_', ' ')}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Payment Amount:</span>
                    <p className="font-medium">${milestone.paymentAmount.toLocaleString()}</p>
                  </div>
                  {milestone.completedDate ? (
                    <div>
                      <span className="text-gray-600">Completed:</span>
                      <p className="font-medium">{milestone.completedDate}</p>
                    </div>
                  ) : milestone.targetDate ? (
                    <div>
                      <span className="text-gray-600">Target Date:</span>
                      <p className="font-medium">{milestone.targetDate}</p>
                    </div>
                  ) : null}
                  {milestone.status === 'in_progress' && milestone.progress && (
                    <div>
                      <span className="text-gray-600">Progress:</span>
                      <div className="mt-1">
                        <Progress value={milestone.progress} className="h-2" />
                        <p className="text-xs mt-1">{milestone.progress}% complete</p>
                      </div>
                    </div>
                  )}
                </div>

                {milestone.status === 'completed' && milestone.proofDocument && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Proof document: {milestone.proofDocument}</span>
                    </div>
                  </div>
                )}

                {milestone.status === 'in_progress' && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Update Progress</label>
                      <Textarea 
                        placeholder="Describe your current progress on this milestone..."
                        className="mt-1"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Proof
                      </Button>
                      {project.pendingPayment > 0 && (
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Request Payment
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {milestone.status === 'completed' && project.pendingPayment > 0 && milestone.id === project.currentMilestone - 1 && (
                  <div className="mt-4">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payment Pending Approval
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MilestoneTracking;
