
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import EntrepreneurProjects from "./pages/EntrepreneurProjects";
import EntrepreneurCreate from "./pages/EntrepreneurCreate";
import EntrepreneurChat from "./pages/EntrepreneurChat";
import InvestorChat from "./pages/InvestorChat";
import Messages from "./pages/Messages";
import Forums from "./pages/Forums";
import InvestmentOpportunities from "./pages/InvestmentOpportunities";
import InvestmentDetails from "./pages/InvestmentDetails";
import InvestmentForm from "./pages/InvestmentForm";
import BiddingProcess from "./pages/BiddingProcess";
import ConsortiumCreation from "./pages/ConsortiumCreation";
import NotFound from "./pages/NotFound";
import BusinessProfile from "./pages/BusinessProfile";
import CreateBusiness from "./pages/CreateBusiness";
import CreateProject from "./pages/CreateProject";
import CreateUpdate from "./pages/CreateUpdate";
import CreateMilestone from "./pages/CreateMilestone";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import AddTeamMember from "./pages/AddTeamMember";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NavigationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />
              <Route path="/entrepreneur-projects" element={<ProtectedRoute><EntrepreneurProjects /></ProtectedRoute>} />
              <Route path="/entrepreneur-create" element={<ProtectedRoute><EntrepreneurCreate /></ProtectedRoute>} />
              <Route path="/entrepreneur-chat" element={<ProtectedRoute><EntrepreneurChat /></ProtectedRoute>} />
              <Route path="/investor-chat" element={<ProtectedRoute><InvestorChat /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/forums" element={<ProtectedRoute><Forums /></ProtectedRoute>} />
              <Route path="/investment-opportunities" element={<ProtectedRoute><InvestmentOpportunities /></ProtectedRoute>} />
              <Route path="/investment-details/:id" element={<ProtectedRoute><InvestmentDetails /></ProtectedRoute>} />
              <Route path="/investment-form/:id" element={<ProtectedRoute><InvestmentForm /></ProtectedRoute>} />
              <Route path="/bidding-process/:id" element={<ProtectedRoute><BiddingProcess /></ProtectedRoute>} />
              <Route path="/consortium-creation" element={<ProtectedRoute><ConsortiumCreation /></ProtectedRoute>} />
              <Route path="/business/:businessId" element={<BusinessProfile />} />

              {/* Create Routes */}
              <Route path="/create-business" element={<ProtectedRoute><CreateBusiness /></ProtectedRoute>} />
              <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
              <Route path="/create-update" element={<ProtectedRoute><CreateUpdate /></ProtectedRoute>} />
              <Route path="/create-milestone" element={<ProtectedRoute><CreateMilestone /></ProtectedRoute>} />
              <Route path="/create-announcement" element={<ProtectedRoute><CreateAnnouncement /></ProtectedRoute>} />
              <Route path="/add-team-member" element={<ProtectedRoute><AddTeamMember /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NavigationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
