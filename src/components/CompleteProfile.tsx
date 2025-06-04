
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Building2, 
  Upload, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface CompleteProfileProps {
  userRole: 'investor' | 'entrepreneur' | 'philanthropist';
}

const CompleteProfile = ({ userRole }: CompleteProfileProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [completionPercentage, setCompletionPercentage] = useState(45);

  const profileSections = {
    personal: {
      title: "Personal Information",
      completed: true,
      fields: ["Full Name", "Email", "Phone", "Location"]
    },
    business: {
      title: userRole === 'entrepreneur' ? "Business Information" : "Investment Profile",
      completed: false,
      fields: userRole === 'entrepreneur' 
        ? ["Business Name", "Industry", "Business Stage", "Description"]
        : ["Investment Focus", "Portfolio Size", "Experience Level", "Geographic Preference"]
    },
    verification: {
      title: "Verification Documents",
      completed: false,
      fields: ["Government ID", "Business Registration", "Bank Statement", "References"]
    },
    preferences: {
      title: "Platform Preferences",
      completed: false,
      fields: ["Notification Settings", "Privacy Settings", "Communication Preferences"]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600">Finish setting up your profile to unlock all MANSA features</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Profile Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Progress Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(profileSections).map(([key, section]) => (
                  <div 
                    key={key}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      activeTab === key ? 'bg-amber-50 border-amber-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{section.title}</span>
                      {section.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {section.completed ? 'Completed' : 'Incomplete'}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Basic information about yourself
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <Input placeholder="Enter your full name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input placeholder="+234 800 000 0000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Location</label>
                        <Input placeholder="City, Country" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea 
                        placeholder="Tell us about yourself..." 
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Profile Picture</label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="business">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {userRole === 'entrepreneur' ? 'Business Information' : 'Investment Profile'}
                    </CardTitle>
                    <CardDescription>
                      {userRole === 'entrepreneur' 
                        ? 'Information about your business'
                        : 'Your investment preferences and experience'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userRole === 'entrepreneur' ? (
                      <>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Business Name</label>
                            <Input placeholder="Your business name" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Industry</label>
                            <Input placeholder="e.g., Agriculture, Technology" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Business Stage</label>
                            <Input placeholder="e.g., Idea, MVP, Scaling" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Founded</label>
                            <Input placeholder="Year founded" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Business Description</label>
                          <Textarea 
                            placeholder="Describe your business..." 
                            rows={4}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Investment Focus</label>
                            <Input placeholder="e.g., AgriTech, FinTech" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Investment Range</label>
                            <Input placeholder="$20 - $10,000" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Experience Level</label>
                            <Input placeholder="Beginner, Intermediate, Expert" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Geographic Preference</label>
                            <Input placeholder="West Africa, East Africa, etc." />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Investment Philosophy</label>
                          <Textarea 
                            placeholder="Describe your investment approach..." 
                            rows={4}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verification">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Documents</CardTitle>
                    <CardDescription>
                      Upload required documents for account verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { name: "Government ID/Passport", required: true },
                      { name: "Business Registration", required: userRole === 'entrepreneur' },
                      { name: "Bank Statement", required: true },
                      { name: "Professional References", required: false }
                    ].map((doc) => (
                      <div key={doc.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">{doc.name}</label>
                          {doc.required && (
                            <Badge variant="outline" className="text-red-600">Required</Badge>
                          )}
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Upload {doc.name}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Preferences</CardTitle>
                    <CardDescription>
                      Customize your MANSA experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Notification Preferences</h4>
                      <div className="space-y-2">
                        {[
                          "Email notifications for new opportunities",
                          "SMS alerts for urgent updates",
                          "Push notifications for messages",
                          "Weekly digest emails"
                        ].map((pref) => (
                          <label key={pref} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Privacy Settings</h4>
                      <div className="space-y-2">
                        {[
                          "Make my profile visible to other users",
                          "Allow direct messages from other users",
                          "Show my investment activity",
                          "Include me in investor matching"
                        ].map((setting) => (
                          <label key={setting} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span className="text-sm">{setting}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
