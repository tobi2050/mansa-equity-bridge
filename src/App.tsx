
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationProvider } from "./contexts/NavigationContext";
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/complete-profile" element={<CompleteProfilePage />} />
              <Route path="/entrepreneur-projects" element={<EntrepreneurProjects />} />
              <Route path="/entrepreneur-create" element={<EntrepreneurCreate />} />
              <Route path="/entrepreneur-chat" element={<EntrepreneurChat />} />
              <Route path="/investor-chat" element={<InvestorChat />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/forums" element={<Forums />} />
              <Route path="/investment-opportunities" element={<InvestmentOpportunities />} />
              <Route path="/investment-details/:id" element={<InvestmentDetails />} />
              <Route path="/investment-form/:id" element={<InvestmentForm />} />
              <Route path="/bidding-process/:id" element={<BiddingProcess />} />
              <Route path="/consortium-creation" element={<ConsortiumCreation />} />
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
