
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Building2, FileText, MessageCircle, Users, Calendar, Target } from "lucide-react";

const EntrepreneurCreate = () => {
  const navigate = useNavigate();

  const createOptions = [
    {
      id: 'business',
      title: 'New Business Listing',
      description: 'Create a new business opportunity for investors',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/create-business')
    },
    {
      id: 'project',
      title: 'New Project',
      description: 'Start a new project within your existing business',
      icon: Target,
      color: 'from-green-500 to-green-600',
      action: () => navigate('/create-project')
    },
    {
      id: 'update',
      title: 'Business Update',
      description: 'Share progress updates with your investors',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/create-update')
    },
    {
      id: 'milestone',
      title: 'Milestone Report',
      description: 'Submit a milestone completion report',
      icon: Calendar,
      color: 'from-amber-500 to-amber-600',
      action: () => navigate('/create-milestone')
    },
    {
      id: 'announcement',
      title: 'Announcement',
      description: 'Make an announcement to your network',
      icon: MessageCircle,
      color: 'from-red-500 to-red-600',
      action: () => navigate('/create-announcement')
    },
    {
      id: 'team',
      title: 'Team Member',
      description: 'Add a new team member to your business',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      action: () => navigate('/add-team-member')
    }
  ];

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
              <h1 className="text-xl font-bold text-gray-900">Create New</h1>
              <p className="text-xs text-gray-600">Choose what you'd like to create</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What would you like to create?</h2>
            <p className="text-gray-600">Choose from the options below to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card 
                  key={option.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={option.action}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                      onClick={option.action}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick tips */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Start with a business listing if this is your first time on MANSA</li>
                <li>• Regular updates help build investor confidence</li>
                <li>• Milestone reports unlock funding tranches</li>
                <li>• Team member profiles add credibility to your business</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurCreate;
