
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import EntrepreneurProjects from "./pages/EntrepreneurProjects";
import EntrepreneurCreate from "./pages/EntrepreneurCreate";
import EntrepreneurChat from "./pages/EntrepreneurChat";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/entrepreneur-dashboard" element={
              <ProtectedRoute requiredRole="entrepreneur">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/:userId" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } />
            <Route path="/complete-profile" element={
              <ProtectedRoute>
                <CompleteProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/entrepreneur-projects" element={
              <ProtectedRoute requiredRole="entrepreneur">
                <EntrepreneurProjects />
              </ProtectedRoute>
            } />
            <Route path="/entrepreneur-create" element={
              <ProtectedRoute requiredRole="entrepreneur">
                <EntrepreneurCreate />
              </ProtectedRoute>
            } />
            <Route path="/entrepreneur-chat" element={
              <ProtectedRoute requiredRole="entrepreneur">
                <EntrepreneurChat />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
